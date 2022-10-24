import { Professional } from "../../../src/domain/entities/Professional";
import { ProfessionalRepository } from "../../../src/domain/repositories/ProfessionalRepository";

export class ProfessionalRepositoryStub implements ProfessionalRepository {
  public output? = new Professional({
    id: 'valid_id',
    name: 'name',
    phone: '(99)99999-9999',
    email: 'valid_email@mail.com',
    professionalType: 'valid_id',
    situation: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  public async add(input: {
    name: string;
    phone: string;
    email: string;
    professionalType: string;
    situation: boolean;
  }) {
    return Promise.resolve(this.output!);
  }
}