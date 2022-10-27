import axios from "axios";

export class  Fetch {
  public static get(url: string) {
    return axios.get(url);
  }

  public static post(url: string, data?: any, options?: any) {
    return axios.post(url, data, options);
  }

  public static put(url: string, data?: any, options?: any) {
    return axios.put(url, data, options);
  }
}