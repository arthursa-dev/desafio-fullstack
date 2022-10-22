import { ProfessionalType } from "../entities/ProfessionalType";

export interface ProfessionalTypeRepository {
  add(input: { description: string, situation: boolean }): Promise<ProfessionalType>;
  get(input: { id: string }): Promise<ProfessionalType | undefined>;
  update(input: { id: string, description?: string, situation?: boolean }): Promise<
    ProfessionalType | undefined
  >
}
