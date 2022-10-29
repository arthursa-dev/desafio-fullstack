import { Fetch } from "../lib/Fetch";
import { ProfessionalType } from "../types";

export async function getProfessionalsType(): Promise<ProfessionalType[]> {
  const result = await Fetch.get('http://localhost:3333/professional-type');
  return result.data;
}
