import { ProfessionalType } from "../../domain/entities/ProfessionalType";
import { ProfessionalRepository } from "../../domain/repositories/ProfessionalRepository";

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

export class ListProfessional {
  private readonly professionalRepository: ProfessionalRepository;
  
  constructor(professionalRepository: ProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }

  public async execute(): Promise<Output[]> {
    const output = await this.professionalRepository.list();
    return output.map((professional) => {
      const outputProfessionalType = professional.professionalType as ProfessionalType;
      return {
        id: professional.id,
        name: professional.name,
        phone: professional.phone,
        email: professional.email,
        professionalType: {
          id: outputProfessionalType.id,
          description: outputProfessionalType.description,
          situation: outputProfessionalType.situation,
          createdAt: outputProfessionalType.createdAt,
          updatedAt: outputProfessionalType.updatedAt,
        },
        situation: professional.situation,
        createdAt: professional.createdAt,
        updatedAt: professional.updatedAt,
      }
    });
  }
}
