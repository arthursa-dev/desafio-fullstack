import request from 'supertest';
import { PostgresDatabaseConnection } from '../../src/infra/db/postgresql/PostgresDatabaseConnection';
import { app } from '../../src/main/app';

const databaseConnection = new PostgresDatabaseConnection();
const professionalType = {
  id: 'dd145fa8-7557-40cf-9973-044ec26cd9ff',
  description: 'test description',
  situation: false,
}
const professional = {
  id: '90fe764b-a6e5-4717-b2b4-b79fcdf6d22f',
  name: 'Antônia Agatha Viana',
  phone: '(61)98939-1146',
  email: 'antonia-viana86@fertility.com.br',
  professionalType: 'dd145fa8-7557-40cf-9973-044ec26cd9ff',
  situation: true,
}

describe('app', () => {
  describe.skip('/professional-type', () => {
    beforeEach(async () => {
      await databaseConnection.query('delete from professional_type', []);
      await databaseConnection.query(
        'insert into professional_type(id, description, situation) values ($1,$2,$3)',
        [professionalType.id, professionalType.description, professionalType.situation]
      );
    });
  
    afterAll(async () => {
      await databaseConnection.query('delete from professional_type', []);
    });
    
    it('GET /', async () => {
      const response = await request(app).get('/professional-type');
    
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body).toContainEqual({
        id: professionalType.id,
        description: professionalType.description,
        situation: professionalType.situation,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  
    it('GET /:id', async () => {
      const response = await request(app).get(`/professional-type/${professionalType.id}`);
    
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: professionalType.id,
        description: professionalType.description,
        situation: professionalType.situation,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  
    it('POST /', async () => {
      const requestBody = {
        description: 'new description',
        situation: true,
      }
      const response = await request(app)
        .post('/professional-type')
        .send(requestBody);
    
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(String),
        description: requestBody.description,
        situation: requestBody.situation,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  
    it('PUT /:id', async () => {
      const requestBody = {
        description: 'updated description',
        situation: true,
      }
      const response = await request(app)
      .put(`/professional-type/${professionalType.id}`)
      .send(requestBody);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: professionalType.id,
        description: requestBody.description,
        situation: requestBody.situation,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
  
  describe('/professional', () => {
    beforeEach(async () => {
      await databaseConnection.query('delete from professional', []);
      await databaseConnection.query('delete from professional_type', []);
      await databaseConnection.query(
        'insert into professional_type(id, description, situation) values ($1,$2,$3)',
        [professionalType.id, professionalType.description, professionalType.situation]
      );
      await databaseConnection.query(
        'insert into professional(id, name, phone, email, professional_type, situation) values ($1,$2,$3,$4,$5, $6)',
        [
          professional.id,
          professional.name,
          professional.phone,
          professional.email,
          professional.professionalType,
          professional.situation
        ]
      );
    });
  
    afterAll(async () => {
      await databaseConnection.query('delete from professional', []);
      await databaseConnection.query('delete from professional_type', []);
    });

    it('GET /', async () => {
      const response = await request(app).get('/professional');
    
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body).toContainEqual({
        id: professional.id,
        name: professional.name,
        phone: professional.phone,
        email: professional.email,
        professionalType: {
          id: professionalType.id,
          description: professionalType.description,
          situation: professionalType.situation,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        situation: professional.situation,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('GET /:id', async () => {
      const response = await request(app).get(`/professional/${professional.id}`);
    
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: professional.id,
        name: professional.name,
        phone: professional.phone,
        email: professional.email,
        professionalType: {
          id: professionalType.id,
          description: professionalType.description,
          situation: professionalType.situation,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        situation: professional.situation,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('POST /', async () => {
      const requestBody = {
        name: 'Josefa Rafaela Julia das Neves',
        phone: '(69)99227-6151',
        email: 'josefa.rafaela.dasneves@yhaoo.com.br',
        professionalType: 'dd145fa8-7557-40cf-9973-044ec26cd9ff',
        situation: false,
      }
      const response = await request(app)
        .post('/professional')
        .send(requestBody);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: requestBody.name,
        phone: requestBody.phone,
        email: requestBody.email,
        professionalType: requestBody.professionalType,
        situation: requestBody.situation,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('PUT /:id', async () => {
      const requestBody = {
        name: 'Josefa Rafaela Julia das Neves',
        phone: '(69)99227-5161',
        email: 'josefa.rafaela.dasneves@yhaoo.com.br',
        professionalType: 'dd145fa8-7557-40cf-9973-044ec26cd9ff',
        situation: true,
      }
      const response = await request(app)
        .put(`/professional/${professional.id}`)
        .send(requestBody);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: professional.id,
        name: requestBody.name,
        phone: requestBody.phone,
        email: requestBody.email,
        professionalType: requestBody.professionalType,
        situation: requestBody.situation,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});

