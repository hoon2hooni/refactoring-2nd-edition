import { assert } from "console"

class Book {
  // ... some code

  addReservation(customer) {
    this.zz_addReservation(customer, false)
  }
  zz_addReservation(customer, isPriority) {
    assert(isPriority === true || isPriority === false);
    this._reservation.push(customer)
  }
}
