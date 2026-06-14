const fs = require('fs');

let code = fs.readFileSync('src/services/productService.js', 'utf-8');

// remove everything before `const MOCK_CATEGORIES`
const mockCatIdx = code.indexOf('const MOCK_CATEGORIES =');
if (mockCatIdx !== -1) {
  code = code.slice(mockCatIdx);
}
// remove everything after the MOCK_PRODUCTS array closes
const exportIdx = code.indexOf('export const productService');
if (exportIdx !== -1) {
  code = code.slice(0, exportIdx);
}

// Add the module.exports at the end
code += '\nmodule.exports = { MOCK_PRODUCTS };\n';

fs.writeFileSync('temp_service.cjs', code);

const { MOCK_PRODUCTS } = require('./temp_service.cjs');

// Modify images to use pollinations.ai for EVERY product
MOCK_PRODUCTS.forEach(p => {
  const prompt = `Professional catalog photo of ${p.name}. ${p.description || ''}`;
  p.images = [`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&nologo=true&seed=42`];
});

// Write to product.json
fs.writeFileSync('product.json', JSON.stringify(MOCK_PRODUCTS, null, 2));

// Now rewrite productService.js to import product.json instead
let originalCode = fs.readFileSync('src/services/productService.js', 'utf-8');

const startIdx = originalCode.indexOf('const MOCK_PRODUCTS = [');
const endIdx = originalCode.indexOf('export const productService = {');

if (startIdx !== -1 && endIdx !== -1) {
  const before = originalCode.slice(0, startIdx);
  const after = originalCode.slice(endIdx);
  // add the import at the top
  const newCode = `import MOCK_PRODUCTS from '../../product.json'\n` + before + after;
  fs.writeFileSync('src/services/productService.js', newCode);
  console.log('Successfully integrated product.json!');
} else {
  console.log('Failed to find MOCK_PRODUCTS or export statement.');
}
