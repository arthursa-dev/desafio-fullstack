import { ProfessionalTypeRepository } from "../repositories/ProfessionalTypeRepository";

type Input = {
  description: string;
  situation: boolean;
}

export class CreateProfessionalType {
  private readonly professionalTypeRepository: ProfessionalTypeRepository;
  
  constructor(professionalTypeRepository: ProfessionalTypeRepository) {
    this.professionalTypeRepository = professionalTypeRepository;
  }
  
  public execute({ description, situation }: Input) {
    this.professionalTypeRepository.add({ description, situation });
  }
}