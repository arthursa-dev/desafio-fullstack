import { Fetch } from "../lib/Fetch";
import { Professional } from "../types";

type Data = {
  name: string;
  phone: string;
  email: string;
  professionalType: string;
  situation: boolean;
}

export async function createProfessional(data: Data): Promise<Professional> {
  const result = await Fetch.post('http://localhost:3333/professional/', data);
  return result.data;
}
