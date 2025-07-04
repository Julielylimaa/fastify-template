export interface RankingEntry {
  id: string;
  name: string;
  username: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface RankingResponse {
  ranking: RankingEntry[];
}
