import request from 'supertest';
import { app } from '../../src/main/app';

describe('/professional-type', () => {
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
});

