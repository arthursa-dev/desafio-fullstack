import { Fetch } from "../lib/Fetch";
import { ProfessionalType } from "../types";

type Data = {
  description: string;
  situation: boolean;
}

export async function updateProfessionalType(
  id: string,
  data: Data
): Promise<ProfessionalType> {
  const result = await Fetch.put(`http://localhost:3333/professional-type/${id}`, data);
  return result.data;
}
