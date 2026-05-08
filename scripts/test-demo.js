#!/usr/bin/env node
'use strict';

const { spawnSync } = require('child_process');
const path = require('path');

const CLI  = path.resolve(__dirname, 'genesis-demo.js');
const EXMP = path.resolve(__dirname, '..', 'examples');

let passed = 0;
let failed = 0;

function run(fixture) {
  const r = spawnSync('node', [CLI, path.join(EXMP, fixture)], { encoding: 'utf8' });
  return r.stdout + r.stderr;
}

function assert(label, output, expected) {
  const missing = expected.filter(s => !output.includes(s));
  if (missing.length === 0) {
    console.log(`  PASS  ${label}`);
    passed++;
  } else {
    console.log(`  FAIL  ${label}`);
    missing.forEach(s => console.log(`        missing: "${s}"`));
    failed++;
  }
}

console.log('\nGENESIS AI Code Safety Gate — Demo Tests\n');

assert('demo-safe.json → ALLOW', run('demo-safe.json'), [
  'Decision : ALLOW',
  '[GENESIS] Risk level: LOW',
]);

assert('demo-danger.json → BLOCK', run('demo-danger.json'), [
  'Decision : BLOCK',
  '[GENESIS] Risk level: CRITICAL',
  'module.exports = null',
]);

assert('demo-dead-code.json → REQUIRE_APPROVAL', run('demo-dead-code.json'), [
  'Decision : REQUIRE_APPROVAL',
  '[GENESIS] Risk level: ELEVATED',
  'dead-code gate',
]);

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
