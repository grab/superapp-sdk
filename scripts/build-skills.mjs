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
 * Hand-written intro line for a reference group, used as the file's own intro
 * and its row in SKILL.md's "Reference Files" lookup table. Keyed by the exact
 * `@skillReference` tag value used in the SDK source (see e.g.
 * src/modules/identity/IdentityModule.ts). A group with no entry here still
 * builds — it just gets a generated blurb instead of a curated one.
 */
const REFERENCE_BLURBS = {
  'Authentication & Permissions':
    'Proactive/reactive permission checks, the full `IdentityModule.authorize()` flow, and the `IdentityModule`/`ScopeModule` API reference.',
  'Container UI & Navigation':
    'Container title/background/buttons, closing, external links, analytics events, native back navigation, and the splash screen.',
  Checkout: 'The two-step payment/checkout flow and the `CheckoutModule` API reference.',
  'Device & Sensors':
    'Hardware/sensor capability access: camera QR scanning, location, DRM media playback, and device info.',
  'Platform Utilities':
    'Simple getter/setter-style native APIs with no dedicated walkthrough: file downloads, locale, logging, network, profile, storage, and user attributes.',
};

/**
 * Slugifies a `@skillReference` group name into its reference filename, e.g.
 * "Authentication & Permissions" -> "authentication-and-permissions.md".
 */
function slugifyReference(title) {
  return (
    title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '.md'
  );
}

/**
 * Guide sections to pull out of the monolithic guides/*.md files and route to a
 * reference group. Anything NOT listed here stays inline in SKILL.md. `heading`
 * must match the section's heading text exactly (heading level is irrelevant —
 * the extracted block is re-rooted to H2 regardless of its source level).
 * `target` must be one of the `@skillReference` group names used in the SDK
 * source — the destination filename is derived from it via slugifyReference().
 */
const GUIDE_SECTION_ROUTES = [
  {
    guide: 'concepts.md',
    heading: 'Permission Verification Strategies',
    target: 'Authentication & Permissions',
  },
  { guide: 'integration.md', heading: 'Authentication', target: 'Authentication & Permissions' },
  {
    guide: 'integration.md',
    heading: 'Container UI & Navigation',
    target: 'Container UI & Navigation',
  },
  {
    guide: 'integration.md',
    heading: 'Opening External Links',
    target: 'Container UI & Navigation',
  },
  {
    guide: 'integration.md',
    heading: 'Analytics Event Tracking',
    target: 'Container UI & Navigation',
  },
  { guide: 'integration.md', heading: 'Checkout', target: 'Checkout' },
];

/**
 * Connective pointer sentence appended to a guide's remaining (non-routed)
 * content once, only if that guide had any sections extracted.
 */
const GUIDE_POINTERS = {
  'concepts.md': `For proactive/reactive permission-checking patterns (including handling \`403 Forbidden\`) with full code, see \`references/${slugifyReference('Authentication & Permissions')}\`.`,
  'integration.md':
    'For the full authentication flow, container UI/navigation controls, analytics event tracking, and the checkout flow, see the relevant reference file below.',
};

/** Extra hand-written connective note inserted into a specific reference file, keyed by group name. */
const REFERENCE_NOTES = {
  'Device & Sensors': `\`LocationModule\` is also used as the running example for the Streams pattern (see \`SKILL.md\` Core Concepts → Streams) and the reactive 403-handling flow (see \`references/${slugifyReference('Authentication & Permissions')}\` → Reactive Checking).`,
};

/**
 * Fix-ups applied to a guide's REMAINING (non-routed) content once it lands in
 * SKILL.md, where an in-line reference to a section that just got routed out
 * would otherwise be stale. Keyed by guide file; each entry is a
 * [search, replace] pair applied to that guide's remaining text only — the
 * guide file on disk (and the HTML/MD doc builds that consume it whole) is
 * untouched.
 */
const GUIDE_REMAINING_FIXUPS = {
  'integration.md': [
    [
      '// (Implementation detailed in the Authentication section below)',
      `// (see references/${slugifyReference('Authentication & Permissions')} for the full authorize() flow)`,
    ],
  ],
};

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
 * Locates every heading line in an array of lines.
 */
function findHeadingLines(lines) {
  return lines
    .map((line, index) => {
      const m = /^(#{1,6})\s+(.*)$/.exec(line);
      return m ? { index, level: m[1].length, title: m[2].trim() } : null;
    })
    .filter(Boolean);
}

/**
 * Returns the [start, end) line range covered by the heading at `headings[i]`,
 * including all of its nested sub-headings (i.e. up to the next heading at the
 * same or a shallower level).
 */
function sectionRange(headings, i, totalLines) {
  const level = headings[i].level;
  let end = totalLines;
  for (let j = i + 1; j < headings.length; j++) {
    if (headings[j].level <= level) {
      end = headings[j].index;
      break;
    }
  }
  return { start: headings[i].index, end };
}

/**
 * Pulls the guide sections named in `routesForGuide` out of `markdown`, re-rooting
 * each extracted section's top heading to H2 (shifting its descendants by the same
 * delta). Throws if a configured heading can't be found — a stale/renamed heading
 * should fail the build, not silently produce an incomplete reference file.
 *
 * @returns {{ remaining: string, extracted: Map<string, string[]> }}
 */
function extractSections(markdown, routesForGuide) {
  const lines = markdown.split('\n');
  const headings = findHeadingLines(lines);
  const extracted = new Map();
  const consumed = new Array(lines.length).fill(false);

  for (const route of routesForGuide) {
    const hIndex = headings.findIndex((h) => h.title === route.heading);
    if (hIndex === -1) {
      throw new Error(
        `build-skills: heading "${route.heading}" not found in guides/${route.guide} ` +
          `(configured to route to the "${route.target}" reference group). Update GUIDE_SECTION_ROUTES ` +
          'in scripts/build-skills.mjs if the heading was renamed.'
      );
    }
    const { start, end } = sectionRange(headings, hIndex, lines.length);
    const block = shiftHeadingLines(lines.slice(start, end), 2 - headings[hIndex].level)
      .join('\n')
      .trim();
    for (let k = start; k < end; k++) consumed[k] = true;
    if (!extracted.has(route.target)) extracted.set(route.target, []);
    extracted.get(route.target).push(block);
  }

  const remaining = lines.filter((_, i) => !consumed[i]).join('\n');
  return { remaining, extracted };
}

/**
 * Strips frontmatter, extracts routed sections, and shifts the remaining content
 * down one heading level so it nests correctly under SKILL.md's top-level headings.
 */
function processGuide(fileName, rawContent) {
  const routes = GUIDE_SECTION_ROUTES.filter((r) => r.guide === fileName);
  const { remaining, extracted } = extractSections(stripFrontmatter(rawContent), routes);

  let remainingShifted = shiftHeadingLines(remaining.split('\n'), 1)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  for (const [search, replace] of GUIDE_REMAINING_FIXUPS[fileName] ?? []) {
    remainingShifted = remainingShifted.split(search).join(replace);
  }

  const pointer = extracted.size > 0 ? GUIDE_POINTERS[fileName] : null;
  if (pointer) remainingShifted = `${remainingShifted}\n\n${pointer}`;

  return { remaining: remainingShifted, extracted };
}

/**
 * Resolves the `@skillReference` group name for a public class's API docs.
 * This is the single source of truth for skill grouping — it lives on the
 * class in the SDK source (see e.g. src/modules/identity/IdentityModule.ts),
 * not in this script, so a new module needs no script edit to be routed.
 */
function resolveClassGroup(cls) {
  const tag = (cls.comment?.blockTags ?? []).find((t) => t.tag === '@skillReference');
  return tag ? renderCommentContent(tag.content) : null;
}

/**
 * Generates the API Reference markdown for each public class, grouped by
 * `@skillReference` value. Throws if a class has no `@skillReference` tag —
 * an unmapped module must break the build, not land in the wrong file or be
 * silently dropped.
 *
 * @returns {Map<string, Array<{ name: string, description: string, section: string }>>}
 *   Keyed by `@skillReference` group name (not filename — see slugifyReference).
 */
function generateClasses(api) {
  const classes = api.children
    .filter((c) => c.kind === KIND_CLASS && c.name !== 'BaseModule' && c.flags?.isPublic)
    .sort((a, b) => a.name.localeCompare(b.name));

  const byGroup = new Map();

  for (const cls of classes) {
    const group = resolveClassGroup(cls);
    if (!group) {
      throw new Error(
        `build-skills: class "${cls.name}" has no @skillReference tag. Add one to its ` +
          'class doc comment in the SDK source naming the reference group it belongs to ' +
          '(e.g. "Platform Utilities").'
      );
    }

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

    const section = [`#### \`${cls.name}\``, description, ...methods].join('\n');

    if (!byGroup.has(group)) byGroup.set(group, []);
    byGroup.get(group).push({ name: cls.name, description, section });
  }

  return byGroup;
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
 * Builds the "Module Index" table (SKILL.md) mapping each public class to the
 * reference file that documents it. Groups (and their file order) are derived
 * directly from the `@skillReference` tags found on the classes themselves —
 * the table cannot drift out of sync with reality, and a new group needs no
 * script edit to appear.
 */
function generateModuleIndex(classesByGroup, groups) {
  const rows = groups.flatMap((group) => {
    const file = slugifyReference(group);
    return classesByGroup
      .get(group)
      .map((entry) => `| \`${entry.name}\` | ${entry.description} | \`references/${file}\` |`);
  });
  return ['| Module | Purpose | Reference file |', '| :--- | :--- | :--- |', ...rows].join('\n');
}

/**
 * Builds the "Reference Files" lookup table (SKILL.md).
 */
function generateReferenceTable(groups) {
  const rows = groups.map((group) => {
    const file = slugifyReference(group);
    const blurb = REFERENCE_BLURBS[group] ?? `${group} API reference.`;
    return `| \`references/${file}\` | ${blurb} |`;
  });
  return ['| File | What it answers |', '| :--- | :--- |', ...rows].join('\n');
}

/**
 * Builds the skills documentation: a lean SKILL.md plus one reference file per
 * domain under skills/references/.
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

  // Everything below is pure computation over `api` and `guides/*.md` — no
  // filesystem mutation yet. generateClasses() throws on a missing
  // @skillReference and extractSections() throws on a missing heading; either
  // must abort the build BEFORE skills/ is touched, so a bad build never
  // destroys good output.
  const remainingGuides = [];
  const extractedByTarget = new Map();
  for (const fileName of orderedGuides) {
    const raw = fs.readFileSync(path.join(GUIDES_DIR, fileName), 'utf-8');
    const { remaining, extracted } = processGuide(fileName, raw);
    remainingGuides.push(remaining);
    for (const [target, blocks] of extracted) {
      if (!extractedByTarget.has(target)) extractedByTarget.set(target, []);
      extractedByTarget.get(target).push(...blocks);
    }
  }
  const guides = remainingGuides.join('\n\n');

  const classesByGroup = generateClasses(api);
  const functions = generateFunctions(api);

  // The set of reference groups — and their file order — comes entirely from
  // the `@skillReference` tags actually present on the SDK's classes, sorted
  // alphabetically for stable, deterministic output. A new group needs no
  // change here.
  const groups = [...classesByGroup.keys()].sort();

  const moduleIndex = [
    '## Module Index',
    '',
    generateModuleIndex(classesByGroup, groups),
    '',
    'New modules should slot into the closest matching reference file above. Only split a file further once it exceeds ~150 lines.',
  ].join('\n');

  const functionsSection = [
    '## Functions',
    '',
    'Type guards for narrowing SDK response types (see Core Concepts → Type Guards for usage).',
    '',
    functions,
  ].join('\n');

  const referenceTable = ['## Reference Files', '', generateReferenceTable(groups)].join('\n');

  const skill = [template.trimEnd(), guides, moduleIndex, functionsSection, referenceTable].join(
    '\n\n\n'
  );

  // Only now that everything above has succeeded do we touch the filesystem.
  // Only clear SKILL.md + references/ (this script's own output) — skills/
  // also holds evals/, which is hand-authored and must survive a rebuild.
  const skillDir = path.join(ROOT_DIR, 'skills');
  const referencesDir = path.join(skillDir, 'references');

  if (fs.existsSync(referencesDir)) fs.rmSync(referencesDir, { recursive: true, force: true });
  fs.mkdirSync(referencesDir, { recursive: true });

  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skill.trimEnd() + '\n');

  for (const group of groups) {
    const file = slugifyReference(group);
    const blurb = REFERENCE_BLURBS[group] ?? `${group} API reference.`;
    const classSections = classesByGroup
      .get(group)
      .map((e) => e.section)
      .join('\n\n');
    const guideSections = (extractedByTarget.get(group) ?? []).join('\n\n');
    const note = REFERENCE_NOTES[group];

    const parts = [
      `# ${group}`,
      note ? `${blurb}\n\n${note}` : blurb,
      guideSections || null,
      `## API Reference\n\n${classSections}`,
    ].filter(Boolean);

    fs.writeFileSync(path.join(referencesDir, file), parts.join('\n\n').trimEnd() + '\n');
  }

  console.log(`Generated skills/SKILL.md + ${groups.length} reference files`);
}

buildSkills();
