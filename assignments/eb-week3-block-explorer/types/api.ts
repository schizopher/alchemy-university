import { BlockWithTransactions, TransactionResponse } from "alchemy-sdk";

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

export interface GetTransactionRequest {
  hash: string;
}

export interface GetTransactionResponse {
  transaction: TransactionResponse;
}
