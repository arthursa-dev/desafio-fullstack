import { Fetch } from "../lib/Fetch";
import { Professional } from "../types";

type Data = {
  name: string;
  phone: string;
  email: string;
  professionalType: string;
  situation: boolean;
}

export async function updateProfessional(id: string, data: Data): Promise<Professional> {
  const result = await Fetch.put(`http://localhost:3333/professional/${id}`, data);
  return result.data;
}
