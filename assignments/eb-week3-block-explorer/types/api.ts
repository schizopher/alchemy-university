import { BlockWithTransactions } from "alchemy-sdk";

export interface ErrorResponse {
  error: string;
}

export interface GetLatestBlockRequest {}
export interface GetLatestBlockResponse {
  block: BlockWithTransactions;
}

export interface GetBlocksRequest {}
export interface GetBlocksResponse {
  blocks: BlockWithTransactions[];
}
