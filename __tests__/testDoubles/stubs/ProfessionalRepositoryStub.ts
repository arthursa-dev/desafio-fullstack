import { Professional } from "../../../src/domain/entities/Professional";
import { ProfessionalType } from "../../../src/domain/entities/ProfessionalType";
import { ProfessionalRepository } from "../../../src/domain/repositories/ProfessionalRepository";

export class ProfessionalRepositoryStub implements ProfessionalRepository {
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
  
  public async add(input: {
    name: string;
    phone: string;
    email: string;
    professionalType: string;
    situation: boolean;
  }) {
    return Promise.resolve(this.output!);
  }

  public get(input: { id: string; }): Promise<Professional> {
    return Promise.resolve(
      new Professional({
        ...this.output,
        professionalType: new ProfessionalType({
          id: 'valid_id',
          description: 'valid description',
          situation: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      })
    );
  }

  public update(input: {
    name: string;
    phone: string;
    email: string;
    professionalType: string;
    situation: boolean;
  }): Promise<Professional> {
    return Promise.resolve(
      new Professional({
        ...this.output,
        name: 'new name',
        phone: '(99)99999-9998',
        professionalType: 'valid_id',
        situation: false,
      })
    );
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
