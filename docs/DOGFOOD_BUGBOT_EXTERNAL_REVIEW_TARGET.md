# Bugbot External Review Dogfood Target

This is a documentation-only pull request used as a safe external target for Bugbot dogfood review.

## Purpose

This PR exists to test whether Bugbot can review a pull request in an external repository from the private Bugbot runner.

## Scope

- Documentation only
- No product behavior change
- No workflow change
- No live execution added
- No Bugbot installation in this repository
- No private code included
- No secrets included

## Expected Review

Bugbot should review this PR externally and produce:

- advisory decision
- risk level
- proof report
- machine-readable JSON result
- privacy and write-safety flags

## Limitations

This file does not make Code Safety use Bugbot directly.
It is only a safe public target for external review validation.
