import { ProfessionalRepository } from "../../domain/repositories/ProfessionalRepository";

type Input = {
  name: string;
  phone: string;
  email: string;
  professionalType: string;
  situation: boolean;
};

type Output = {
  id: string;
  name: string;
  phone: string;
  email: string;
  professionalType: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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
}: Input): Promise<Output> {
    const output = await this.professionalRepository.add({
      name,
      phone,
      email,
      professionalType,
      situation,
    });
    return {
      id: output.id,
      name: output.name,
      phone: output.phone,
      email: output.email,
      professionalType: output.professionalType as string,
      situation: output.situation,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    }
  }
}