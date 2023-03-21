import TXO from "./TXO";

export default class Transaction {
  inputUTXOs: TXO[];
  outputUTXOs: TXO[];
  fee: number;

  constructor(inputUTXOs: TXO[], outputUTXOs: TXO[]) {
    this.inputUTXOs = inputUTXOs;
    this.outputUTXOs = outputUTXOs;
    this.fee = 0;
  }
  execute() {
    let totalOutput = 0;
    for (const output of this.outputUTXOs) {
      totalOutput = totalOutput + output.amount;
    }
    for (const input of this.inputUTXOs) {
      if (input.spent) throw new Error("Double spend.");
      totalOutput = totalOutput - input.amount;
    }
    if (totalOutput > 0) throw new Error("Insufficient inputs.");
    for (const input of this.inputUTXOs) {
      input.spend();
    }
    this.fee = -totalOutput;
  }
}

module.exports = Transaction;
