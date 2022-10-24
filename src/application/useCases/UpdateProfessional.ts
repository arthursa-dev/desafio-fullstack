import { ProfessionalRepository } from "../../domain/repositories/ProfessionalRepository";

type Input = {
  id: string;
  name: string;
  phone: string;
  email: string;
  professionalType: string;
  situation: boolean;
}

export class UpdateProfessional {
  private readonly professionalRepository: ProfessionalRepository;
  
  constructor(professionalRepository: ProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }

  public async execute({
    id,
    name,
    phone,
    email,
    professionalType,
    situation
  }: Input) {
    await this.professionalRepository.update({
      id,
      name,
      phone,
      email,
      professionalType,
      situation
    })
  }
}
