# Bugbot Outcome Report — Sample

**Date:** 2026-05-10
**Repository:** example-org/example-repo
**Pull Request:** #42
**Status:** ACCEPTED

---

## Outcome Summary

No contamination detected. All safety checks passed. This pull request has been
verified as safe for human review.

**Recommendation:** Safe to proceed with standard human code review.

---

## Proof Chain

| Step     | Status   | Detail                                                       |
|----------|----------|--------------------------------------------------------------|
| Proof    | ACCEPTED | GitHub read-only · writes detected: false · 4 files changed |
| Learning | ACCEPTED | Archive written · 1 record stored · 5 records read          |
| Insight  | ACCEPTED | Dominant decision: APPROVED · Dominant risk: INFO            |
| Outcome  | ACCEPTED | trusted: true · decision: ACCEPTED                           |
| Contract | VALID    | bugbot.module.contract.v1 · valid: true · errors: 0          |

---

## Privacy Verification

| Check                        | Result |
|------------------------------|--------|
| Raw source code stored       | NO     |
| Raw diff content stored      | NO     |
| File contents stored         | NO     |
| Sensitive values stored      | NO     |
| Stores only metadata         | YES    |

---

## GitHub Safety Verification

| Check                        | Result |
|------------------------------|--------|
| GitHub read-only             | YES    |
| No GitHub writes performed   | YES    |
| No merge performed           | YES    |
| No PR created by Bugbot      | YES    |

---

## Contract Validation Result

```json
{
  "contract": "bugbot.module.contract.v1",
  "status": "ACCEPTED",
  "valid": true,
  "privacySafe": true,
  "githubWriteSafe": true,
  "genesisCoreSafe": true,
  "errors": []
}
```

---

## Limitations

- Local validation only — no cloud or remote service involved.
- Metadata only — no raw code, diff, or file contents were stored.
- Sample data — this report uses sanitized fictional data for demonstration purposes.
- Bugbot is a prototype proof layer, not a production security engine.
- Running against a real PR requires a local Bugbot verifier environment.

---

*AI Code Safety Gate · Powered by PROVE BY GENESIS*
