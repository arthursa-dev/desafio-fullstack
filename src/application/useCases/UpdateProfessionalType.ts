import { ProfessionalType } from "../../domain/entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../../domain/repositories/ProfessionalTypeRepository";

type Input = {
  id: string;
  description?: string;
  situation?: boolean;
}

export class UpdateProfessionalType {
  private readonly professionalTypeRepository: ProfessionalTypeRepository;
  
  constructor(professionalTypeRepository: ProfessionalTypeRepository) {
    this.professionalTypeRepository = professionalTypeRepository;
  }

  public async execute({ id, description, situation }: Input): Promise<ProfessionalType | undefined> {
    const output = await this.professionalTypeRepository.update({ id, description, situation })
    if (!output) return;
    return {
      id: output.id,
      description: output.description,
      situation: output.situation,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt
    };
  }
}
