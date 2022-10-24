import { Professional } from "../../../src/domain/entities/Professional";
import { ProfessionalRepository } from "../../../src/domain/repositories/ProfessionalRepository";

export class ProfessionalRepositorySpy implements ProfessionalRepository {
  public name?: string;
  public phone?: string;
  public email?: string;
  public professionalType?: string;
  public situation?: boolean;

  public async add({
    name,
    phone,
    email,
    professionalType,
    situation,
  }: {
    name: string;
    phone: string;
    email: string;
    professionalType: string;
    situation: boolean;
  }) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.professionalType = professionalType;
    this.situation = situation;
    return Promise.resolve(new Professional({
      id: 'valid_id',
      name: 'name',
      phone: '(99)99999-9999',
      email: 'valid_email@mail.com',
      professionalType: 'valid_id',
      situation: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }
}
