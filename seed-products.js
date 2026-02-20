const http = require('http');

const products = [
  { title: "Silla de Oficina Ergonomica", price: 150.50, stock: 10, description: "Silla muy comoda para trabajar largas horas" },
  { title: "Monitor 4K 27 pulgadas", price: 450.00, stock: 5, description: "Monitor de alta resolucion para disenadores" },
  { title: "Teclado Mecanico RGB", price: 85.00, stock: 20, description: "Teclado con switches rojos y luces personalizables" }
];

const postProduct = (product) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(product);
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve(body));
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
};

async function seed() {
  console.log('🚀 Iniciando creación de productos...');
  for (const product of products) {
    try {
      const response = await postProduct(product);
      console.log(`✅ Creado: ${product.title} -> ${response}`);
    } catch (e) {
      console.error(`❌ Error creando ${product.title}:`, e.message);
    }
  }
  console.log('🏁 Proceso terminado.');
}

seed();
