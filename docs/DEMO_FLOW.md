# Demo Flow — How to Evaluate Code Safety

This document explains what each demo page shows, how the sample data is structured, and what you should look for when evaluating the demo.

---

## Main Page — Decision Gate

**URL:** [https://aicodesafety.com](https://aicodesafety.com/)

**What it is:**
The decision gate. You submit a code snippet (or select a preset scenario) and the gate returns one of three decisions: `ALLOW`, `REQUIRE_APPROVAL`, or `BLOCK`.

**How it works:**
The page runs the classification logic in the browser. No server call is made. The decision engine is a client-side JavaScript implementation of the pattern classifier.

**Flow:**
```
User selects scenario (or pastes code)
  → Pattern classifier evaluates the snippet
    → Decision returned: ALLOW / REQUIRE_APPROVAL / BLOCK
      → Human-readable explanation displayed
        → Machine-readable JSON shown
```

**Four preset scenarios:**

| Scenario | Pattern | Expected Decision |
|---|---|---|
| Safe helper | `function formatDate(d) { return d.toISOString(); }` | `ALLOW` |
| Dead-code gate | `if (false) { runMigration(); }` | `REQUIRE_APPROVAL` |
| Export destruction | `module.exports = null;` | `BLOCK` |
| Custom input | Paste your own code | Depends on content |

**What to look for:**
- The decision JSON is machine-readable — copy it and parse it in any tool
- The explanation maps the pattern to the rule that triggered it
- The decision is deterministic — the same input always returns the same output
- There is no confidence score — the decision is explicit

**What this page does not show:**
- Real GitHub PR analysis
- Bugbot proof chain
- Learning archive
- Contract validation

---

## Bugbot Demo Page — Proof Chain

**URL:** [https://aicodesafety.com/bugbot-demo.html](https://aicodesafety.com/bugbot-demo.html)

**What it is:**
An interactive walkthrough of a complete Bugbot proof chain run. The page uses sanitized sample data to show what each step of the chain produces.

**How it works:**
The page renders sample JSON from the `examples/` directory. No live GitHub API calls are made from the browser. The data represents a realistic Bugbot run against a fictional PR.

**Flow:**
```
PR reference displayed (sample data)
  → Proof step: files changed, write surface check, JSON validation
    → Learning step: archive written, privacy flags verified
      → Insight step: dominant patterns, signals, candidate rules
        → Outcome step: trusted decision with supporting evidence
          → Contract step: machine-readable contract validation result
```

**What each step shows:**

**Proof:**
- How many files changed
- Which surfaces were touched (modules, tests, docs)
- Write surface before/after state — proving no GitHub writes occurred
- Node.js and Python JSON validation results

**Learning:**
- That a record was written to the local archive
- The record shape: changeProfile, riskProfile, learningSignals
- Privacy flags: rawCodeStored=false, storesOnlyMetadata=true
- The JSONL format (append-only, one record per line)

**Insight:**
- dominantDecision: what the archive says most often
- dominantRisk: the most common risk level
- topSurfaces: which parts of the codebase are touched most
- activeSignals: which learning signals fired
- candidateRules: suggestions based on signal frequency (not injected into rule engine)

**Outcome:**
- trusted: true/false
- The final decision with the evidence chain behind it
- GitHub safety flags: no writes, no merge, no PR creation

**Contract:**
- bugbot.module.contract.v1 — the declared contract version
- valid: true/false
- privacySafe, githubWriteSafe, genesisCoreSafe flags
- errors: [] — zero errors expected

**What to look for:**
- Every step produces JSON — not prose
- Privacy flags are explicit and consistent across all steps
- The contract validation is a machine-readable pass/fail — not a qualitative assessment
- INCONCLUSIVE is a valid and expected output for incomplete chains
- The sample data uses a fictional org/repo — no real repository data

**What this page does not show:**
- Live execution against a real PR
- The private GENESIS core risk engine
- The full learning archive (only a sample record)
- Rule engine internals

---

## Sample Data

All data in `examples/` is sanitized and fictional:

| File | What it contains |
|---|---|
| `bugbot-outcome-sample.json` | Complete outcome JSON from a sample Bugbot run |
| `bugbot-contract-sample.json` | Contract validation result |
| `bugbot-learning-archive-sample.jsonl` | One-record JSONL sample archive |
| `bugbot-proof-summary.md` | Human-readable proof report (markdown format) |
| `demo-safe.json` | Safe scenario for the CLI demo runner |
| `demo-danger.json` | BLOCK scenario for the CLI demo runner |
| `demo-dead-code.json` | REQUIRE_APPROVAL scenario for the CLI demo runner |

**PR reference used in sample data:**
`https://github.com/example-org/example-repo/pull/42` — this is a fictional reference. It does not point to a real PR.

---

## How to Evaluate the Demo

When reviewing this demo, focus on:

1. **Decision determinism** — does the same input always return the same output? (It should.)
2. **JSON shape** — is the output machine-readable and parseable? (It should be.)
3. **Privacy flags** — are rawCodeStored, rawDiffStored, and secretsStored always false? (They should be.)
4. **INCONCLUSIVE posture** — does the system return INCONCLUSIVE rather than a false pass when evidence is missing? (It should.)
5. **Read-only proof** — does the proof step explicitly verify no GitHub writes occurred? (It does.)
6. **Contract validation** — does the contract step check output shape and safety flags independently of the chain? (It does.)

Do not evaluate:
- Performance at scale (this is a prototype)
- Security hardening (this is not a production security engine)
- GitHub App integration (not yet built)
- Cross-repo learning (archive is local only)

---

*AI Code Safety Gate · Powered by PROVE BY GENESIS*
