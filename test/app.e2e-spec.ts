import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

jest.setTimeout(30000); // 30 segundos para dar tiempo a la DB

describe('AppController (e2e) - Flujo Completo de Publicaciones', () => {
  let app: INestApplication;
  let token: string;
  let productId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Importante: Replicar la configuración de main.ts para que el test sea real
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    await app.init();
  });

  // 1. Probar Login
  it('/api/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'user1@test.com', password: '123' })
      .expect(201)
      .then((response) => {
        expect(response.body.token).toBeDefined();
        token = response.body.token; // Guardamos el token para los siguientes tests
      });
  });

  // 2. Probar Creación de Producto (Requiere Auth)
  it('/api/products (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Laptop Pro de Prueba E2E',
        price: 1200,
        stock: 5,
        description: 'Creado desde el test E2E'
      })
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.slug).toBe('laptop_pro_de_prueba_e2e');
        productId = response.body.id; // Guardamos el ID del producto
      });
  });

  // 3. Probar Creación de Publicación (Requiere Auth y Producto)
  it('/api/publications (POST)', () => {
    const startDate = new Date().toISOString();
    const endDate = new Date(Date.now() + 86400000).toISOString(); // +1 día

    return request(app.getHttpServer())
      .post('/api/publications')
      .set('Authorization', `Bearer ${token}`)
      .send({
        startDate,
        endDate,
        productId,
        status: 'ACTIVE'
      })
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.product.id).toBe(productId);
        expect(response.body.status).toBe('ACTIVE');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
