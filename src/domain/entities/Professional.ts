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
    if (!this.isPhoneValid(phone)) {
      throw new Error('Invalid phone number');
    }
    
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.professionalType = professionalType;
    this.situation = situation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isPhoneValid(phone: string) {
    const regex = /([(]?[0]?[1-9]{2}[)]?)[9]?([1-9]{4})-?([0-9]{4})/;
    return regex.test(phone);
  }
}
