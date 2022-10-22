import { ProfessionalType } from "../entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../repositories/ProfessionalTypeRepository";

type Input = {
  id: string;
}

export class GetProfessionalType {
  private readonly professionalTypeRepository: ProfessionalTypeRepository;
  
  constructor(professionalTypeRepository: ProfessionalTypeRepository) {
    this.professionalTypeRepository = professionalTypeRepository;
  }

  public async execute({ id }: Input): Promise<ProfessionalType | undefined> {
    const output = await this.professionalTypeRepository.get({ id });
    if (!output) return;
    return {
      id: output.id,
      description: output.description,
      situation: output.situation,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}
