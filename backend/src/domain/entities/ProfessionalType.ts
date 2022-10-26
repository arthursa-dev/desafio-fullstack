type ProfessionalTypeProps = {
  id: string;
  description: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ProfessionalType {
  id: string;
  description: string;
  situation: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    description,
    situation,
    createdAt,
    updatedAt
  }: ProfessionalTypeProps) {
    this.id = id;
    this.description = description;
    this.situation = situation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
