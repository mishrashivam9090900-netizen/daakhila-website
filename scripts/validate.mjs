import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const requiredIds = ['checker', 'quotas', 'courses', 'plans', 'services', 'documents', 'resources', 'faq', 'privacy', 'contact'];
const missing = requiredIds.filter((id) => !html.includes(`id="${id}"`));
const h1Count = (html.match(/<h1\b/g) || []).length;
if (missing.length || h1Count !== 1) {
  console.error(`Validation failed. Missing sections: ${missing.join(', ') || 'none'}; h1 count: ${h1Count}.`);
  process.exit(1);
}
console.log('Static site validation passed.');
