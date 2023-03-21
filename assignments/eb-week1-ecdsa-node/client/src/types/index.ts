export interface Wallet {
  pk: string;
  sk: string;
  address: string;
}

export interface Transaction {
  amount: number;
  recipient: string;
}

export interface SendTransactionRequest {
  transaction: Transaction;
  signature: string;
  recoveryBit: number;
}
