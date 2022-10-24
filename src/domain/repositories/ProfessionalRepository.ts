import { Professional } from "../entities/Professional";

export interface ProfessionalRepository {
  add(input: {
    name: string;
    phone: string;
    email: string;
    professionalType: string;
    situation: boolean;
  }): Promise<Professional>;
}
