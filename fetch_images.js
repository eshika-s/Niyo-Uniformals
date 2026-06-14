import fs from 'fs';
import { execSync } from 'child_process';

const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

function searchImageCurl(query) {
  try {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=1`;
    const result = execSync(`curl.exe -s "${url}"`).toString();
    const json = JSON.parse(result);
    if (json.results && json.results.length > 0) {
      return json.results[0].urls.regular;
    }
    return null;
  } catch (err) {
    return null;
  }
}

async function processProducts() {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`Fetching image for: ${product.title}`);
    
    let query = product.title.replace(/\([^)]*\)/g, '').trim();
    // Use only the first 3 words of the title to ensure we get results
    query = query.split(' ').slice(-3).join(' '); 
    
    let img = searchImageCurl(query);
    if (!img) {
      // try a broader query
      let altQuery = query.split(' ').pop() || query;
      img = searchImageCurl(altQuery);
    }
    
    if (img) {
      product.image = img;
      console.log(' -> Found: ' + img.substring(0, 50));
    } else {
      console.log(' -> Not found, using placeholder');
      product.image = `https://placehold.co/800x600?text=${encodeURIComponent(product.title)}`;
    }
    // sleep
    await new Promise(r => setTimeout(r, 1000));
  }
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
  console.log('Done');
}

processProducts();
