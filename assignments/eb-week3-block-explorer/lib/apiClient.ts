import axios from "axios";
import { BlockWithTransactions, TransactionResponse } from "alchemy-sdk";
import {
  GetLatestBlockResponse,
  GetBlocksResponse,
  GetTransactionResponse,
} from "~/types";

axios.defaults.baseURL = "/api";

export default class apiClient {
  static async getLatestBlock(): Promise<BlockWithTransactions> {
    const res = await axios.get<GetLatestBlockResponse>("/blocks/latest");
    return res.data.block;
  }
  static async getBlocks(): Promise<BlockWithTransactions[]> {
    const res = await axios.get<GetBlocksResponse>("/blocks");
    return res.data.blocks;
  }
  static async getTransaction(hash: string): Promise<TransactionResponse> {
    const res = await axios.get<GetTransactionResponse>(`/tx/${hash}`);
    return res.data.transaction;
  }
}
