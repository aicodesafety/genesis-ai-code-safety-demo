#!/usr/bin/env node
// PUBLIC DEMO ONLY — does not contain or import the private GENESIS core engine.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (!args[0]) {
  console.log('Usage: node scripts/genesis-demo.js <path-to-json>');
  process.exit(1);
}

const filePath = path.resolve(args[0]);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

let input;
try {
  const raw = fs.readFileSync(filePath, 'utf8');
  input = JSON.parse(raw);
} catch (e) {
  console.error('Failed to parse JSON input:', e.message);
  process.exit(1);
}

const content = input.content || '';
const label = input.label || path.basename(filePath);

console.log('\n========================================');
console.log('  GENESIS AI Code Safety Gate — DEMO');
console.log('  [PUBLIC DEMO SHELL — core not included]');
console.log('========================================\n');
console.log(`Input : ${label}`);
console.log(`File  : ${path.basename(filePath)}\n`);

if (content.includes('module.exports = null')) {
  console.log('Decision : BLOCK');
  console.log('Reason   : Detected module.exports = null — critical export nullification.');
  console.log('Action   : Change blocked before execution.\n');
  console.log('--- DEMO OUTPUT ---');
  console.log('[GENESIS] BLOCK — This change was stopped before reaching the execution pipeline.');
  console.log('[GENESIS] Pattern matched: module.exports = null');
  console.log('[GENESIS] Risk level: CRITICAL');
} else if (content.includes('if (false)') || content.includes('if(false)')) {
  console.log('Decision : REQUIRE_APPROVAL');
  console.log('Reason   : Detected dead-code gate pattern — if(false) disables critical flow.');
  console.log('Action   : Change queued for human review.\n');
  console.log('--- DEMO OUTPUT ---');
  console.log('[GENESIS] REQUIRE_APPROVAL — Human sign-off required before execution.');
  console.log('[GENESIS] Pattern matched: dead-code gate (if(false))');
  console.log('[GENESIS] Risk level: ELEVATED');
} else {
  console.log('Decision : ALLOW');
  console.log('Reason   : No known public-demo risk patterns detected.');
  console.log('Action   : Cleared by the limited public demo rules.\n');
  console.log('--- DEMO OUTPUT ---');
  console.log('[GENESIS] ALLOW — No known public-demo risk patterns matched.');
  console.log('[GENESIS] Risk level: LOW');
  console.log('[GENESIS] Note: The public demo checks simple visible patterns only. The private core handles broader classification.');
}

console.log('\n========================================');
console.log('  NOTE: This is a public demo shell.');
console.log('  The private GENESIS core is not included.');
console.log('========================================\n');
