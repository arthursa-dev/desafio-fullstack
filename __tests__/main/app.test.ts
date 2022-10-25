import request from 'supertest';
import { PostgresDatabaseConnection } from '../../src/infra/db/postgresql/PostgresDatabaseConnection';
import { app } from '../../src/main/app';

const databaseConnection = new PostgresDatabaseConnection();
const professionalType = {
  id: 'dd145fa8-7557-40cf-9973-044ec26cd9ff',
  description: 'test description',
  situation: false,
}

describe('/professional-type', () => {
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

