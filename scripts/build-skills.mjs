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
 * Renders a TypeDoc comment content array to markdown text.
 */
function renderCommentContent(content = []) {
  return content
    .map((c) => {
      if (!c) return '';
      if (c.kind === 'text') return c.text ?? '';
      if (c.kind === 'code') {
        const code = c.text ?? '';
        if (!code) return '';
        const trimmed = code.trim();
        if (trimmed.startsWith('`') && trimmed.endsWith('`')) return code;
        return `\`${code}\``;
      }
      if (c.kind === 'inline-tag') {
        if (c.text) return c.text;
        if (c.target?.name) return `\`${c.target.name}\``;
        return '';
      }
      return c.text ?? '';
    })
    .join('')
    .trim();
}

/**
 * Extracts summary text from a TypeDoc comment.
 */
function commentSummary(comment) {
  return renderCommentContent(comment?.summary ?? []).trim();
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
  return renderCommentContent(tag.content ?? []);
}

/**
 * Extracts the content of every occurrence of a JSDoc block tag from a
 * comment — a method can carry more than one `@example` (e.g. one per
 * request variant), and only surfacing the first would silently drop
 * the rest.
 */
function extractAllBlockTags(comment, tagName) {
  return (comment?.blockTags ?? [])
    .filter((t) => t.tag === tagName)
    .map((t) => renderCommentContent(t.content ?? []));
}

/**
 * Builds a requirements string from JSDoc tags.
 * @param {Object} comment - The TypeDoc comment object
 * @returns {string|null} Formatted requirements string or null if no tags found
 */
function buildRequirements(comment) {
  const requirements = [];

  const requiredOAuthScope = extractBlockTag(comment, '@requiredOAuthScope');
  if (requiredOAuthScope) {
    requirements.push(`**OAuth Scope:** ${requiredOAuthScope}`);
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
 * Strips YAML frontmatter from a guide's raw markdown.
 */
function stripFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---\n+/, '');
}

/**
 * Shifts every ATX heading (# .. ######) in an array of lines by `delta` levels,
 * clamped to a minimum of H1.
 */
function shiftHeadingLines(lines, delta) {
  if (!delta) return lines;
  return lines.map((line) => {
    const m = /^(#{1,6})(\s+.*)$/.exec(line);
    if (!m) return line;
    const newLevel = Math.max(1, m[1].length + delta);
    return '#'.repeat(newLevel) + m[2];
  });
}

/**
 * Generates the API Reference markdown for each public class. Every class
 * gets its own reference file — no grouping decision, no tag to maintain:
 * `api.json` already has everything (summary, methods, `@example`,
 * `@returns`) needed to document a class standalone, so the filename is
 * just the class name.
 *
 * @returns {Array<{ name: string, description: string, section: string }>}
 *   Sorted by class name — this order also drives the Module Index table
 *   and each generated file's write order.
 */
function generateClasses(api) {
  const classes = api.children
    .filter((c) => c.kind === KIND_CLASS && c.name !== 'BaseModule' && c.flags?.isPublic)
    .sort((a, b) => a.name.localeCompare(b.name));

  return classes.map((cls) => {
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
        const signatureLine = `- \`${sig.name}(${params}): ${getReturnTypeName(sig)}\` — ${fullDesc}`;

        const returns = extractBlockTag(sig.comment, '@returns');
        const examples = extractAllBlockTags(sig.comment, '@example');
        const details = [returns, ...examples].filter(Boolean).join('\n\n');

        return details ? `${signatureLine}\n\n${details}` : signatureLine;
      })
      .filter(Boolean);

    const section = [`## API Reference`, description, ...methods].join('\n\n');

    return { name: cls.name, description, section };
  });
}

/**
 * Generates the Markdown section for each public top-level function (the type
 * guards). These stay universal and inline in SKILL.md, not routed per-file.
 */
function generateFunctions(api) {
  const functions = api.children
    .filter((c) => c.kind === KIND_FUNCTION && c.flags?.isPublic)
    .sort((a, b) => a.name.localeCompare(b.name));

  return functions
    .map((fn) => {
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
    })
    .filter(Boolean)
    .join('\n\n');
}

/**
 * Builds the "Module Index" table (SKILL.md) mapping each public class to
 * its own reference file. One row per class, in the same order the classes
 * were generated (alphabetical) — the table cannot drift out of sync with
 * reality, since the filename is just the class name.
 */
function generateModuleIndex(classes) {
  const rows = classes.map(
    (cls) => `| \`${cls.name}\` | ${cls.description} | \`references/${cls.name}.md\` |`
  );
  return ['| Module | Purpose | Reference file |', '| :--- | :--- | :--- |', ...rows].join('\n');
}

/**
 * Builds the skills documentation: a lean SKILL.md plus one reference file
 * per class under skills/references/.
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

  const allGuides = fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'ai-assistance.md' && f !== 'jsdoc-tags.md');
  const orderedGuides = [
    ...GUIDE_ORDER.filter((f) => allGuides.includes(f)),
    ...allGuides.filter((f) => !GUIDE_ORDER.includes(f)).sort(),
  ];

  // Guides are read whole and shifted one heading level to nest under
  // SKILL.md's top-level headings — no per-heading routing. Every class
  // being fully self-documented (methods, @example, @returns) means guide
  // content only needs to cover what's genuinely cross-class or universal.
  const guides = orderedGuides
    .map((fileName) => {
      const raw = fs.readFileSync(path.join(GUIDES_DIR, fileName), 'utf-8');
      return shiftHeadingLines(stripFrontmatter(raw).split('\n'), 1).join('\n').trim();
    })
    .join('\n\n');

  const classes = generateClasses(api);
  const functions = generateFunctions(api);

  const moduleIndex = [
    '## Module Index',
    '',
    generateModuleIndex(classes),
    '',
    'New modules automatically get their own reference file — no script or tag changes needed.',
  ].join('\n');

  const functionsSection = [
    '## Functions',
    '',
    'Type guards for narrowing SDK response types (see Core Concepts → Type Guards for usage).',
    '',
    functions,
  ].join('\n');

  const skill = [template.trimEnd(), guides, moduleIndex, functionsSection].join('\n\n\n');

  // Only now that everything above has succeeded do we touch the filesystem.
  const skillDir = path.join(ROOT_DIR, 'skills');
  const referencesDir = path.join(skillDir, 'references');

  if (fs.existsSync(skillDir)) fs.rmSync(skillDir, { recursive: true, force: true });
  fs.mkdirSync(referencesDir, { recursive: true });

  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skill.trimEnd() + '\n');

  for (const cls of classes) {
    fs.writeFileSync(
      path.join(referencesDir, `${cls.name}.md`),
      `# ${cls.name}\n\n${cls.section}`.trimEnd() + '\n'
    );
  }

  console.log(`Generated skills/SKILL.md + ${classes.length} reference files`);
}

buildSkills();
