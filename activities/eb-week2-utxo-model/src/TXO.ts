export default class TXO {
  owner: string;
  amount: number;
  spent: boolean;

  constructor(owner: string, amount: number) {
    this.owner = owner;
    this.amount = amount;
    this.spent = false;
  }
  spend() {
    this.spent = true;
  }
}
