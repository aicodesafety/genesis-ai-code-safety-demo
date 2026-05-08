# GENESIS — HTML Demo QA Checklist

## Goal

Verify that the public browser demo works before sharing.

## Open Demo

From the public repo folder:

```bash
open index.html
```

Or double-click index.html.

## Required Manual Tests

### Test 1 — Safe Change

Click:

Try Safe Change

Expected:

- Decision: ALLOW
- Risk: LOW
- No block message

### Test 2 — Dangerous Export Nullification

Click:

Try Dangerous Export Nullification

Expected:

- Decision: BLOCK
- Risk: CRITICAL
- Reason mentions module.exports = null

### Test 3 — Dead-Code Gate

Click:

Try Dead-Code Gate

Expected:

- Decision: REQUIRE_APPROVAL
- Risk: ELEVATED
- Reason mentions if(false)

### Test 4 — Custom Input

Paste:

```js
module.exports = null;
```

Click:

Analyze Change

Expected:

- BLOCK

### Test 5 — Custom Safe Input

Paste:

```js
function add(a, b) {
  return a + b;
}
```

Click:

Analyze Change

Expected:

- ALLOW

## Safety Check

The HTML demo must not contain:

- lib/genesis
- internalRiskEngine
- semanticRiskEngine
- decisionEngine
- filesystemExecutionAdapter
- 01_Active_Projects
- 00_AI_System
- OPENAI_API_KEY
- ANTHROPIC_API_KEY
- process.env
- private repo URLs
- genesis-core-private

## Approval

Only publish/share the repo after all tests pass.
