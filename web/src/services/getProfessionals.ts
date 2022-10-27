import { Fetch } from "../lib/Fetch";
import { Professional } from "../types";

export async function getProfessionals(): Promise<Professional[]> {
  const result = await Fetch.get('http://localhost:3333/professional');
  return result.data
}
