import request from 'supertest';
import { app } from '../../src/main/app';

describe.skip('/professional-type', () => {
  // TODO: clear database before each test
  
  it('GET /', async () => {
    const response = await request(app).get('/professional-type');
  
    expect(response.status).toBe(200);
    expect(response.body).toContainEqual({
      id: expect.any(String),
      description: 'Professor',
      situation: true,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('GET /:id', async () => {
    const response = await request(app).get('/professional-type/9b79242b-0d95-485d-aa29-847bcffb5985');
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      description: 'Cientista',
      situation: true,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('POST /', async () => {
    const response = await request(app)
      .post('/professional-type')
      .send({
        description: 'Médica',
        situation: true,
      });
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      description: 'Médica',
      situation: true,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('PUT /:id', async () => {
    const response = await request(app)
    .put('/professional-type/ac154cd0-6973-4950-b4cf-98ab46cdc40d')
    .send({
      description: 'Médica veterinária',
      situation: false,
    });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      description: 'Médica veterinária',
      situation: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

