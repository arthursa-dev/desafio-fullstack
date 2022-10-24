import { ProfessionalType } from "../../domain/entities/ProfessionalType";
import { ProfessionalRepository } from "../../domain/repositories/ProfessionalRepository";

type Input = {
  id: string;
}

export class GetProfessional {
  private readonly professionalRepository: ProfessionalRepository;
  
  constructor(professionalRepository: ProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }

  public async execute({ id }: Input) {
    const output = await this.professionalRepository.get({ id });
    const p = output.professionalType as ProfessionalType;
    return {
      id: output.id,
      name: output.name,
      phone: output.phone,
      email: output.email,
      professionalType: new ProfessionalType({
        id: p.id,
        description: p.description,
        situation: p.situation,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      }),
      situation: output.situation,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}
