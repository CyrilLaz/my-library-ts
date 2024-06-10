import axios from "axios";
import { ICounterApi } from "../interfaces/Counter.interface";

export class ApiCounter implements ICounterApi {
  private instance;
  constructor(url: string) {
    this.instance = axios.create({
      baseURL: `${url}counter`,
    });
  }

  async incrementCount(id: string) {
    try {
      const { data } = await this.instance.post(`/${id}/incr`);
      return data;
    } catch (error) {
      return error;
    }
  }

  async getCount(id: string): Promise<number> {
    try {
      const { data } = await this.instance.get(`/${id}`);
      return data;
    } catch (error: any) {
      return error;
    }
  }
}
