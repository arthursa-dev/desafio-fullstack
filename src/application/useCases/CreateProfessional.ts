import { ProfessionalRepository } from "../../domain/repositories/ProfessionalRepository";

type Input = {
  name: string;
  phone: string;
  email: string;
  professionalType: string;
  situation: boolean;
};

export class CreateProfessional {
  private readonly professionalRepository: ProfessionalRepository;
  
  constructor(professionalRepository: ProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }
  
  public async execute({
    name,
    phone,
    email,
    professionalType,
    situation,
}: Input) {
    await this.professionalRepository.add({
      name,
      phone,
      email,
      professionalType,
      situation,
    });
  }
}