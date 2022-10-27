import { ProfessionalType } from "./ProfessionalType";

export type Professional = {
  id: string;
  name: string;
  phone: string;
  email: string;
  professionalType: ProfessionalType;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
};