# GENESIS Demo — Sample Output

---

## demo-safe.json → ALLOW

```
========================================
  GENESIS AI Code Safety Gate — DEMO
  [PUBLIC DEMO SHELL — core not included]
========================================

Input : Safe helper addition
File  : demo-safe.json

Decision : ALLOW
Reason   : No known public-demo risk patterns detected.
Action   : Cleared by the limited public demo rules.

--- DEMO OUTPUT ---
[GENESIS] ALLOW — No known public-demo risk patterns matched.
[GENESIS] Risk level: LOW
[GENESIS] Note: The public demo checks simple visible patterns only. The private core handles broader classification.

========================================
  NOTE: This is a public demo shell.
  The private GENESIS core is not included.
========================================
```

---

## demo-danger.json → BLOCK

```
========================================
  GENESIS AI Code Safety Gate — DEMO
  [PUBLIC DEMO SHELL — core not included]
========================================

Input : Critical export nullification
File  : demo-danger.json

Decision : BLOCK
Reason   : Detected module.exports = null — critical export nullification.
Action   : Change blocked before execution.

--- DEMO OUTPUT ---
[GENESIS] BLOCK — This change was stopped before reaching the execution pipeline.
[GENESIS] Pattern matched: module.exports = null
[GENESIS] Risk level: CRITICAL

========================================
  NOTE: This is a public demo shell.
  The private GENESIS core is not included.
========================================
```

---

## demo-dead-code.json → REQUIRE_APPROVAL

```
========================================
  GENESIS AI Code Safety Gate — DEMO
  [PUBLIC DEMO SHELL — core not included]
========================================

Input : Dead-code gate in critical flow
File  : demo-dead-code.json

Decision : REQUIRE_APPROVAL
Reason   : Detected dead-code gate pattern — if(false) disables critical flow.
Action   : Change queued for human review.

--- DEMO OUTPUT ---
[GENESIS] REQUIRE_APPROVAL — Human sign-off required before execution.
[GENESIS] Pattern matched: dead-code gate (if(false))
[GENESIS] Risk level: ELEVATED

========================================
  NOTE: This is a public demo shell.
  The private GENESIS core is not included.
========================================
```
