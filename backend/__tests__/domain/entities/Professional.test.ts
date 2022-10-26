import { Professional } from "../../../src/domain/entities/Professional";

describe('Professional', () => {
  it('should create a professional', () => {
    const now = new Date();
    const professional = new Professional({
      id: 'valid_id',
      name: 'name',
      phone: '(99)99999-9999',
      email: 'valid_email@mail.com',
      professionalType: 'valid_id',
      situation: true,
      createdAt: now,
      updatedAt: now,
    });

    expect(professional).toEqual({
      id: 'valid_id',
      name: 'name',
      phone: '(99)99999-9999',
      email: 'valid_email@mail.com',
      professionalType: 'valid_id',
      situation: true,
      createdAt: now,
      updatedAt: now,
    });
  });

  it('should not create a professional with invalid phone number', () => {
    expect(() => new Professional({
      id: 'valid_id',
      name: 'name',
      phone: '(99)99999-999',
      email: 'valid_email@mail.com',
      professionalType: 'valid_id',
      situation: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })).toThrow(new Error('Invalid phone number'));
  });
});
