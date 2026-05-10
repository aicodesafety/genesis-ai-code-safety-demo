# Bugbot Proof Chain

**PR → Proof → Learning → Insight → Outcome → Contract**

Bugbot is the verification layer of Code Safety. It does not guess whether a pull request is safe. It runs a chain of deterministic steps, produces machine-readable evidence at each step, and returns a final decision backed by that evidence.

Every step that fails or is missing causes the chain to return `INCONCLUSIVE` — not a false pass.

---

## Step 1: Proof

**What it means:**
Bugbot reads the pull request metadata using GitHub read-only API endpoints only. It captures the before/after state of the write surface (PR comments, reviews, inline reviews, check runs) to verify that no GitHub writes were performed during the run.

**What is proven:**
- How many files changed
- Which surface areas were touched (modules, tests, docs, config, scripts)
- Whether any GitHub writes occurred (expected: none)
- Whether the output JSON is machine-readable and prefix-clean
- Node.js and Python JSON validation of the output

**What is not claimed:**
- The content of the changed code is not stored
- Raw diffs are not stored
- File contents are not stored
- No judgment about code quality — only structural metadata

**Output shape:**
```json
{
  "status": "ACCEPTED",
  "bugbotDecision": "APPROVED",
  "changedFilesCount": 4,
  "writesDetected": false,
  "nodeJsonValid": true,
  "pythonJsonValid": true
}
```

---

## Step 2: Learning

**What it means:**
The proof result is serialized into a privacy-safe learning record and appended to a local JSONL archive. Each record captures structural metadata only: surface categories, risk flags, signal states.

**What is proven:**
- Archive was written (or failure is explicit — never silent)
- Record format is valid
- No forbidden fields (rawCode, rawDiff, fileContents, patch, secretValue, tokenValue) are present — checked recursively
- Privacy flags are all correct (rawCodeStored: false, storesOnlyMetadata: true)

**What is not claimed:**
- No raw source code is stored
- No raw diff content is stored
- No file contents are stored
- Archive is local only — no remote storage

**Output shape (per JSONL record):**
```json
{
  "recordType": "bugbot.pr.learning_record",
  "version": "1.0",
  "changeProfile": { "filesChanged": 4, "surfaces": ["modules", "tests"] },
  "riskProfile": { "bugbotDecision": "APPROVED", "overallRisk": "INFO" },
  "learningSignals": { "missingTestsRisk": false, "coreBoundaryPressure": false },
  "privacy": { "rawCodeStored": false, "storesOnlyMetadata": true }
}
```

---

## Step 3: Insight

**What it means:**
The local learning archive is read and summarized. Bugbot derives deterministic insights from the metadata counts: what patterns recur, which signals are active, what weak spots appear, and what candidate rules might address them.

**What is proven:**
- All records in the archive are valid (invalid records produce INCONCLUSIVE)
- Dominant decisions and risks are computed from actual counts
- Active signals reflect real archive state
- Candidate rules are derived from thresholds — never fabricated

**What is not claimed:**
- Candidate rules are suggestions only — they are not injected into the rule engine
- Insights are based on the local archive only — no cross-repo data
- No AI inference — all derivation is deterministic counting and threshold logic

**Output shape:**
```json
{
  "insights": {
    "dominantDecision": "APPROVED",
    "dominantRisk": "INFO",
    "topSurfaces": ["modules", "tests", "docs"],
    "activeSignals": [],
    "candidateRules": [],
    "recommendedNextAction": "Continue collecting PR records to build signal confidence."
  }
}
```

---

## Step 4: Outcome

**What it means:**
The proof, learning, and insight results are combined into a single outcome object with a final trusted/blocked decision.

**What is proven:**
- Each upstream step completed without error
- The trusted flag reflects the combined evidence — not a guess
- GitHub safety flags are verified: no writes, no merge, no PR creation

**What is not claimed:**
- The outcome is not a security certification
- It does not replace human review
- It reflects the state of the local verifier environment only

**Output shape:**
```json
{
  "runner": "bugbot-outcome-demo",
  "status": "ACCEPTED",
  "decision": "ACCEPTED",
  "outcome": {
    "trusted": true,
    "summary": "No contamination detected. All safety checks passed.",
    "recommendedNextAction": "Safe to proceed with human review."
  }
}
```

---

## Step 5: Contract

**What it means:**
The outcome JSON is validated against a machine-readable contract (`bugbot.module.contract.v1`). The contract checks that the output shape is correct, privacy flags are safe, and no forbidden fields exist.

**What is proven:**
- Output conforms to the declared contract version
- `privacySafe: true` — no raw data in the output
- `githubWriteSafe: true` — no GitHub writes occurred
- `genesisCoreSafe: true` — no private core exposure
- Zero errors in contract validation

**What is not claimed:**
- The contract is not a cryptographic signature
- It does not prove the upstream data source is trustworthy
- It validates the output format and safety flags — not the business logic

**Output shape:**
```json
{
  "runner": "bugbot-contract-validator",
  "contract": "bugbot.module.contract.v1",
  "contractVersion": "1.0",
  "status": "ACCEPTED",
  "valid": true,
  "privacySafe": true,
  "githubWriteSafe": true,
  "genesisCoreSafe": true,
  "errors": []
}
```

---

## Chain Integrity

The chain is only as strong as its weakest step.

If any step returns `INCONCLUSIVE`:
- The chain does not promote to `ACCEPTED`
- The failure is explicit and machine-readable
- No false pass is possible

If the archive contains malformed lines or invalid records:
- The insight step returns `INCONCLUSIVE`
- The outcome reflects the gap

If GitHub writes are detected during the proof step:
- The proof status is `BLOCKED`
- The chain reflects the contamination

**There is no silent success path.**

---

## Sample Data

All sample data in this repository (`examples/`) uses sanitized fictional PR references. No real PR data, no real repository data, no personal information.

See [examples/bugbot-proof-summary.md](../examples/bugbot-proof-summary.md) for a complete sample human-readable proof report.

---

*AI Code Safety Gate · Powered by PROVE BY GENESIS*
