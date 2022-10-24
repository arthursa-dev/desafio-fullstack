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
    await this.professionalRepository.get({ id });
  }
}
