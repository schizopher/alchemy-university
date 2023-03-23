import axios from "axios";
import { GetLatestBlockResponse } from "~/types";

axios.defaults.baseURL = "/api";

export default class apiClient {
  static async getLatestBlock(): Promise<number> {
    const res = await axios.get<GetLatestBlockResponse>("/blocks/latest");
    return res.data.latestBlock;
  }
}
