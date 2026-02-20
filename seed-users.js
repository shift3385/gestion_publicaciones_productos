const http = require('http');

const users = [
  { fullName: "User#1", email: "user1@test.com", password: "123" },
  { fullName: "User#2", email: "user2@test.com", password: "123" },
  { fullName: "User#3", email: "user3@test.com", password: "123" },
  { fullName: "User#4", email: "user4@test.com", password: "123" },
  { fullName: "User#5", email: "user5@test.com", password: "123" }
];

const postUser = (user) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(user);
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/users',
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
  console.log('🚀 Iniciando creación de usuarios...');
  for (const user of users) {
    try {
      const response = await postUser(user);
      console.log(`✅ Creado: ${user.fullName} -> ${response}`);
    } catch (e) {
      console.error(`❌ Error creando ${user.fullName}:`, e.message);
    }
  }
  console.log('🏁 Proceso terminado.');
}

seed();
