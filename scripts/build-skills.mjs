/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const API_JSON_FILE = path.join(ROOT_DIR, 'api-reference', 'api.json');
const SKILLS_TEMPLATE = path.join(ROOT_DIR, 'scripts', 'skills-template.md');
const GUIDES_DIR = path.join(ROOT_DIR, 'guides');

const GUIDE_ORDER = ['setup.md', 'concepts.md', 'integration.md'];

const KIND_CLASS = 128;
const KIND_FUNCTION = 64;
const KIND_METHOD = 2048;

/**
 * Extracts plain text from a TypeDoc comment content array.
 */
function commentSummary(comment) {
  return (comment?.summary ?? [])
    .filter((c) => c.kind === 'text')
    .map((c) => c.text)
    .join('')
    .trim();
}

/**
 * Extracts the content of a specific JSDoc block tag from a comment.
 * @param {Object} comment - The TypeDoc comment object
 * @param {string} tagName - The tag name to extract (e.g., '@requiredOAuthScope')
 * @returns {string|null} The tag content or null if not found
 */
function extractBlockTag(comment, tagName) {
  const blockTags = comment?.blockTags ?? [];
  const tag = blockTags.find((t) => t.tag === tagName);
  if (!tag) return null;
  return tag.content
    .filter((c) => c.kind === 'text')
    .map((c) => c.text)
    .join('')
    .trim();
}

/**
 * Builds a requirements string from JSDoc tags.
 * @param {Object} comment - The TypeDoc comment object
 * @returns {string|null} Formatted requirements string or null if no tags found
 */
function buildRequirements(comment) {
  const requirements = [];

  const oauthScope = extractBlockTag(comment, '@requiredOAuthScope');
  if (oauthScope) {
    requirements.push(`**OAuth Scope:** ${oauthScope}`);
  }

  const minVersion = extractBlockTag(comment, '@minimumGrabAppVersion');
  if (minVersion) {
    requirements.push(`**Minimum Grab App Version:** ${minVersion}`);
  }

  if (requirements.length === 0) return null;
  return requirements.join(' | ');
}

/**
 * Renders a TypeDoc type node to a readable TypeScript string.
 */
function renderType(type) {
  if (!type) return 'unknown';
  switch (type.type) {
    case 'intrinsic':
      return type.name;
    case 'literal':
      return typeof type.value === 'string' ? `"${type.value}"` : String(type.value);
    case 'reference': {
      if (!type.name) return 'unknown';
      if (type.typeArguments?.length) {
        return `${type.name}<${type.typeArguments.map(renderType).join(', ')}>`;
      }
      return type.name;
    }
    case 'union':
      return type.types.map(renderType).join(' | ');
    case 'intersection':
      return type.types.map(renderType).join(' & ');
    case 'array':
      return `${renderType(type.elementType)}[]`;
    case 'predicate': {
      const target = type.targetType ? ` is ${renderType(type.targetType)}` : '';
      return `${type.name}${target}`;
    }
    case 'reflection': {
      const decl = type.declaration;
      if (!decl) return '{}';
      if (decl.indexSignatures?.length) {
        const sig = decl.indexSignatures[0];
        const key = sig.parameters?.[0];
        return `Record<${key ? renderType(key.type) : 'string'}, ${renderType(sig.type)}>`;
      }
      if (!decl.children?.length) return '{}';
      const props = decl.children.map((c) => {
        const opt = c.flags?.isOptional ? '?' : '';
        return `${c.name}${opt}: ${renderType(c.type)}`;
      });
      return `{ ${props.join('; ')} }`;
    }
    default:
      return type.name ?? type.type ?? 'unknown';
  }
}

/**
 * Returns the type name for a method parameter.
 * Uses the named reference if available, otherwise renders the inline type.
 */
function getParamTypeName(param) {
  if (param.type?.type === 'reference' && param.type.name) return param.type.name;
  return renderType(param.type);
}

/**
 * Returns the return type for a method signature.
 */
function getReturnTypeName(sig) {
  return renderType(sig.type);
}

/**
 * Strips YAML frontmatter and shifts all headings down by one level
 * so guide h1s become h2s when inlined into SKILL.md.
 */
function inlineGuide(content) {
  const stripped = content.replace(/^---[\s\S]*?---\n+/, '');
  return stripped.replace(/^(#{1,5}) /gm, (_, hashes) => '#'.repeat(hashes.length + 1) + ' ');
}

/**
 * Generates a Markdown section for each public class in the API.
 */
function generateClasses(api) {
  const classes = api.children
    .filter((c) => c.kind === KIND_CLASS && c.name !== 'BaseModule' && c.flags?.isPublic)
    .sort((a, b) => a.name.localeCompare(b.name));

  const sections = classes.map((cls) => {
    const description = commentSummary(cls.comment);

    const methods = (cls.children ?? [])
      .filter((c) => c.kind === KIND_METHOD && c.flags?.isPublic)
      .map((method) => {
        const sig = method.signatures?.[0];
        if (!sig) return null;
        const desc = commentSummary(sig.comment);
        const requirements = buildRequirements(sig.comment);
        const fullDesc = requirements ? `${desc} (${requirements})` : desc;
        const params = (sig.parameters ?? [])
          .map((p) => `${p.name}${p.flags?.isOptional ? '?' : ''}: ${getParamTypeName(p)}`)
          .join(', ');
        return `- \`${sig.name}(${params}): ${getReturnTypeName(sig)}\` — ${fullDesc}`;
      })
      .filter(Boolean);

    return [`#### \`${cls.name}\``, description, ...methods].join('\n');
  });

  return `### Classes\n\n${sections.join('\n\n')}`;
}

/**
 * Generates a Markdown section for each public function in the API.
 */
function generateFunctions(api) {
  const functions = api.children
    .filter((c) => c.kind === KIND_FUNCTION && c.flags?.isPublic)
    .sort((a, b) => a.name.localeCompare(b.name));

  const sections = functions.map((fn) => {
    const sig = fn.signatures?.[0];
    if (!sig) return null;
    const description = commentSummary(sig.comment ?? fn.comment);
    const typeParams = sig.typeParameters?.length
      ? `<${sig.typeParameters.map((t) => t.name).join(', ')}>`
      : '';
    const params = (sig.parameters ?? [])
      .map((p) => `${p.name}${p.flags?.isOptional ? '?' : ''}: ${getParamTypeName(p)}`)
      .join(', ');
    const returnType = renderType(sig.type);
    return `#### \`${fn.name}\`\n${description}\n\`\`\`ts\n${fn.name}${typeParams}(${params}): ${returnType}\n\`\`\``;
  });

  return `### Functions\n\n${sections.join('\n\n')}`;
}

/**
 * Builds the skills documentation.
 */
function buildSkills() {
  if (!fs.existsSync(API_JSON_FILE)) {
    console.error(
      `Error: ${API_JSON_FILE} not found.\n` +
        'The TypeDoc JSON must be generated before building skills.\n' +
        'Run: npm run build:docs:api'
    );
    process.exit(1);
  }

  const api = JSON.parse(fs.readFileSync(API_JSON_FILE, 'utf-8'));
  const template = fs.readFileSync(SKILLS_TEMPLATE, 'utf-8');

  const skillDir = path.join(ROOT_DIR, 'skills');

  if (fs.existsSync(skillDir)) fs.rmSync(skillDir, { recursive: true, force: true });
  fs.mkdirSync(skillDir, { recursive: true });

  const allGuides = fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'ai-assistance.md' && f !== 'jsdoc-tags.md');
  const orderedGuides = [
    ...GUIDE_ORDER.filter((f) => allGuides.includes(f)),
    ...allGuides.filter((f) => !GUIDE_ORDER.includes(f)).sort(),
  ];
  const guides = orderedGuides
    .map((f) => inlineGuide(fs.readFileSync(path.join(GUIDES_DIR, f), 'utf-8')))
    .join('\n\n');

  const apiReference = `## API Reference\n\n${generateClasses(api)}\n\n${generateFunctions(api)}`;

  const skill = [template.trimEnd(), guides, apiReference].join('\n\n');

  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skill);
  console.log('Generated skills/SKILL.md');
}

buildSkills();
