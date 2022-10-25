import { ProfessionalType } from "../../domain/entities/ProfessionalType";
import { ProfessionalRepository } from "../../domain/repositories/ProfessionalRepository";

type Input = {
  id: string;
  name: string;
  phone: string;
  email: string;
  professionalType: string;
  situation: boolean;
}

type Output = {
  id: string;
  name: string;
  phone: string;
  email: string;
  professionalType: {
    id: string;
    description: string;
    situation: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
};

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
  }: Input): Promise<Output> {
    const output = await this.professionalRepository.update({
      id,
      name,
      phone,
      email,
      professionalType,
      situation
    });
    const outputProfessionalType = output.professionalType as ProfessionalType;
    return {
      id: output.id,
      name: output.name,
      phone: output.phone,
      email: output.email,
      professionalType: {
        id: outputProfessionalType.id,
        description: outputProfessionalType.description,
        situation: outputProfessionalType.situation,
        createdAt: outputProfessionalType.createdAt,
        updatedAt: outputProfessionalType.updatedAt,
      },
      situation: output.situation,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}
