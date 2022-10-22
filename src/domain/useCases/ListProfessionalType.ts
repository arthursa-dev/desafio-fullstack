import { ProfessionalType } from "../entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../repositories/ProfessionalTypeRepository";

type Input = {
  id: string;
}

export class ListProfessionalType {
  private readonly professionalTypeRepository: ProfessionalTypeRepository;
  
  constructor(professionalTypeRepository: ProfessionalTypeRepository) {
    this.professionalTypeRepository = professionalTypeRepository;
  }

  public async execute(): Promise<ProfessionalType[]> {
    const output = await this.professionalTypeRepository.list();
    return output.map((professionalType) => ({
      id: professionalType.id,
      description: professionalType.description,
      situation: professionalType.situation,
      createdAt: professionalType.createdAt,
      updatedAt: professionalType.updatedAt,
    }));
  }
}
