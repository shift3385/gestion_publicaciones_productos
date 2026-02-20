const http = require('http');

// 1. Datos para Login
const loginData = JSON.stringify({ email: "user1@test.com", password: "123" });

// Función auxiliar para hacer peticiones
const request = (path, method, data, token = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data ? data.length : 0
      }
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', e => reject(e));
    if (data) req.write(data);
    req.end();
  });
};

async function testPublicationFlow() {
  try {
    console.log('🔑 1. Logueando...');
    const loginRes = await request('/api/auth/login', 'POST', loginData);
    if (!loginRes.token) throw new Error('No se pudo obtener el token');
    const token = loginRes.token;
    console.log('✅ Token obtenido.');

    console.log('📦 2. Obteniendo productos...');
    const productsRes = await request('/api/products', 'GET', null, token);
    if (!productsRes.length) throw new Error('No hay productos creados. Corre seed-products.js primero.');
    const product = productsRes[0];
    console.log(`✅ Producto seleccionado: ${product.title} (${product.id})`);

    console.log('📢 3. Creando publicación...');
    const pubData = JSON.stringify({
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // +7 días
      productId: product.id,
      status: 'ACTIVE'
    });
    
    const pubRes = await request('/api/publications', 'POST', pubData, token);
    console.log('✅ Publicación creada con éxito:');
    console.log(JSON.stringify(pubRes, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testPublicationFlow();
