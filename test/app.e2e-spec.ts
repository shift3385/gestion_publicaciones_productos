import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

jest.setTimeout(30000); // 30 segundos para dar tiempo a la DB

describe('AppController (e2e) - Flujo Completo de Publicaciones', () => {
  let app: INestApplication;
  let token: string;
  let productId1: string;
  let productId2: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Importante: Replicar la configuración de main.ts para que el test sea real
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    await app.init();

    // Crear un usuario de prueba directamente si no existe para que el login pase
    const usersService = moduleFixture.get(require('./../src/users/users.service').UsersService);
    try {
      await usersService.create({
        email: 'user1@test.com',
        password: '123',
        fullName: 'Test User'
      });
    } catch (e) {
      // Si ya existe, ignoramos el error
    }
  });

  // --- PRUEBAS DE AUTENTICACIÓN ---
  
  it('/api/auth/login (POST) - Fallo por password incorrecto', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'user1@test.com', password: 'wrong_password' })
      .expect(401);
  });

  it('/api/auth/login (POST) - Éxito', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'user1@test.com', password: '123' })
      .expect(201)
      .then((response) => {
        expect(response.body.token).toBeDefined();
        token = response.body.token;
      });
  });

  // --- PRUEBAS DE PRODUCTOS ---

  it('/api/products (POST) - Crear Producto #1', () => {
    return request(app.getHttpServer())
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: `Product One ${Date.now()}`,
        price: 150
      })
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined();
        productId1 = response.body.id;
      });
  });

  it('/api/products (POST) - Crear Producto #2', () => {
    return request(app.getHttpServer())
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: `Product Two ${Date.now() + 1}`,
        price: 250
      })
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined();
        productId2 = response.body.id;
      });
  });

  // --- PRUEBAS DE PUBLICACIONES ---

  it('/api/publications (POST) - Crear con Múltiples Productos', () => {
    const startDate = new Date().toISOString();
    const endDate = new Date(Date.now() + 86400000).toISOString();

    return request(app.getHttpServer())
      .post('/api/publications')
      .set('Authorization', `Bearer ${token}`)
      .send({
        startDate,
        endDate,
        productIds: [productId1, productId2],
        status: 'ACTIVE'
      })
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.products).toHaveLength(2);
        const ids = response.body.products.map(p => p.id);
        expect(ids).toContain(productId1);
        expect(ids).toContain(productId2);
      });
  });

  it('/api/publications (POST) - Fallo por producto inexistente', () => {
    return request(app.getHttpServer())
      .post('/api/publications')
      .set('Authorization', `Bearer ${token}`)
      .send({
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000).toISOString(),
        productIds: ['00000000-0000-0000-0000-000000000000'],
        status: 'ACTIVE'
      })
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
