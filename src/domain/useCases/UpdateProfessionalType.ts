import { ProfessionalType } from "../entities/ProfessionalType";
import { ProfessionalTypeRepository } from "../repositories/ProfessionalTypeRepository";

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
    this.professionalTypeRepository.update({ id, description, situation })
    return undefined;
  }
}
