# Contributing to @grabjs/superapp-sdk

## JSDoc Standard

All public API symbols (exported modules, classes, functions, types) must include JSDoc comments for discoverability and generated documentation. Follow the guidelines below for consistency across the library.

### Public API (classes, exported functions)

- **`@remarks`** – For behavior, constraints, edge cases, or non-obvious semantics
- **`@param`** – For each parameter, with description (e.g. `@param name - Description`)
- **`@returns`** – Describe the return value
- **`@example`** – For non-trivial usage
- Use **`{@link TypeName}`** for cross-references to other types or symbols

### Types

- **Brief summary line** – One-line description
- **`@remarks`** – When behavior or constraints matter
- **Property-level JSDoc** – For union/object types, document significant properties

### Internal API (`@internal`)

- **When to use**: Add `@internal` to symbols that are not part of the public API (not exported from the main package entry point).
- **Placement**: Put `@internal` immediately after the summary block, before `@param` / `@returns`.
- **Typedoc**: With `excludeInternal: true`, these symbols are hidden from generated docs.

### Format conventions

- Use `@remarks` for non-obvious behavior
- Use `{@link TypeName}` when referencing other types in descriptions
- Align `@param` / `@returns` style: always include descriptions
- Blank line between the summary block and the first `@param`
- Blank line between the summary block and `@internal` when both are present

### Inline comments

- **Section headers**: Use `// SectionName` or `// ----` in barrel/index files to group exports.
- **Implementation notes**: Use `//` sparingly for brief inline clarifications within function bodies.
- Prefer `@remarks` in JSDoc when documenting behavior that belongs to a symbol.

### Example (function)

```typescript
/**
 * Validates that a value is a non-empty string.
 *
 * @param value - The value to validate.
 * @param fieldName - The name of the field for error messages.
 *
 * @returns Error message if invalid, `null` if valid.
 *
 * @remarks
 * "Non-empty" means the string must exist and not be all whitespace after trim.
 */
export function validateRequiredString(value: string, fieldName: string): string | null {
  // ...
}
```

### Example (type with properties)

```typescript
/**
 * Version information for semantic version comparison.
 *
 * @remarks
 * Used with {@link isVersionBelow} for feature version checks (e.g., minimum app version).
 */
export type Version = {
  major: number;
  minor: number;
  patch: number;
};
```

### ESLint enforcement

- `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-returns`, `jsdoc/require-returns-description` are enforced as **error** for source code in `src/`
- Scripts in `scripts/` use relaxed JSDoc rules (off)
