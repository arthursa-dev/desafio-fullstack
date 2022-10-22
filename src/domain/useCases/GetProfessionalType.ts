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
    this.professionalTypeRepository.get({ id });
    return undefined;
  }
}
