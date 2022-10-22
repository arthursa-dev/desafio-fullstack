import { ProfessionalTypeRepository } from "../repositories/ProfessionalTypeRepository";

type Input = {
  description: string;
  situation: boolean;
}

type Output = {
  id: string;
  description: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateProfessionalType {
  private readonly professionalTypeRepository: ProfessionalTypeRepository;
  
  constructor(professionalTypeRepository: ProfessionalTypeRepository) {
    this.professionalTypeRepository = professionalTypeRepository;
  }
  
  public async execute({ description, situation }: Input): Promise<Output> {
    const output = await this.professionalTypeRepository.add({
      description,
      situation
    });
    return {
      id: output.id,
      description: output.description,
      situation: output.situation,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}