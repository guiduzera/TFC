export type Iteam = {
  id: number;
  teamName: string;
};

export interface IteamServices {
  getAll(): Promise<Iteam[]>;
  getById(id: number): Promise<Iteam>;
}
