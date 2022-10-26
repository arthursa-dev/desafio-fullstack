import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";

describe('ProfessionalType', () => {
  it('should create a professional type', () => {
    const now = new Date();
    const professionalType = new ProfessionalType({
      id: 'valid_id',
      description: 'some description',
      situation: true,
      createdAt: now,
      updatedAt: now,
    });

    expect(professionalType).toEqual({
      id: 'valid_id',
      description: 'some description',
      situation: true,
      createdAt: now,
      updatedAt: now,
    });
  });
})