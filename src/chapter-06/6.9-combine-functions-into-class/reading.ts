{
  interface IData {
    customer: string;
    quantity: number;
    month: string;
    year: string;
  }

  class CData {
    private customer: string;
    private quantity: number;
    private month: string;
    private year: string;
  }

  class Reading {
    private customer: string;
    private quantity: number;
    private month: string;
    private year: string;

    constructor(data: IData) {
      const { customer, quantity, month, year } = data;
      this.customer = customer;
      this.quantity = quantity;
      this.month = month;
      this.year = year;
    }

    get baseCharge() {
      return baseRate(this.month, this.year) * this.quantity;
    }
  }
}
