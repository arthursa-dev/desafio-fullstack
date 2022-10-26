import { Professional } from "../../../src/domain/entities/Professional";
import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";
import { ProfessionalRepository } from "../../../src/domain/repositories/ProfessionalRepository";

export class ProfessionalRepositorySpy implements ProfessionalRepository {
  public id?: string;
  public name?: string;
  public phone?: string;
  public email?: string;
  public professionalType?: string;
  public situation?: boolean;

  public output = new Professional({
    id: 'valid_id',
    name: 'name',
    phone: '(99)99999-9999',
    email: 'valid_email@mail.com',
    professionalType: 'valid_id',
    situation: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }); 

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
    return Promise.resolve(this.output);
  }

  public async get({ id }: { id: string; }): Promise<Professional> {
    this.id = id;
    return Promise.resolve(this.output);
  }

  public update({
    id,
    name,
    phone,
    email,
    professionalType,
    situation,
  }: {
    id: string;
    name: string;
    phone: string;
    email: string;
    professionalType: string;
    situation: boolean;
  }): Promise<Professional> {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.professionalType = professionalType;
    this.situation = situation;
    return Promise.resolve(this.output);
  }

  public list(): Promise<Professional[]> {
    return Promise.resolve([new Professional({
      ...this.output,
      professionalType: new ProfessionalType({
        id: 'valid_id',
        description: 'valid description',
        situation: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    })]);
  }
}
