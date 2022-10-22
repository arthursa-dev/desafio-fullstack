import { ProfessionalType } from "../entities/ProfessionalType";

export interface ProfessionalTypeRepository {
  add(input: { description: string, situation: boolean }): Promise<ProfessionalType>;
}