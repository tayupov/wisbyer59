import { observable } from 'mobx'

mobx.useStrict(true)

const API_ROOT = 'https://wisbyer59-api.herokuapp.com';

class ExpensesStore {
  @observable expenses = []
  @observable fetchStatus = 'pending'

  @action
  fetchExpenses() {
    this.expenses = []
    fetch(API_ROOT + '/expenses')
      .then(res => res.json())
      .then(data => {
        this.expenses = data
        this.fetchStatus = 'done'
      })
      .catch(error => {
        this.fetchStatus = 'error'
      })
  }
}