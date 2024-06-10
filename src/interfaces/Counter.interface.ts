export interface ICounterApi {
  incrementCount(id: string): Promise<any>;
  getCount(id: string): Promise<number>;
}
