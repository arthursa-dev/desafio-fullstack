import { Fetch } from "../lib/Fetch";
import { ProfessionalType } from "../types";

type Data = {
  description: string;
  situation: boolean;
}

export async function createProfessionalType(data: Data): Promise<ProfessionalType> {
  const result = await Fetch.post('http://localhost:3333/professional-type/', data);
  return result.data;
}
