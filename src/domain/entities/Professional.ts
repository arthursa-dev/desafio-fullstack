type ProfessionalProps = {
  id: string;
  name: string;
  phone: string;
  email: string;
  professionalType: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Professional {
  id: string;
  name: string;
  phone: string;
  email: string;
  professionalType: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    phone,
    email,
    professionalType,
    situation,
    createdAt,
    updatedAt,
  }: ProfessionalProps) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.professionalType = professionalType;
    this.situation = situation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
