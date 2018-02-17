import { observable, computed, action } from 'mobx'
import minimalHeaders from 'constants/minimalHeaders'
const API_ROOT = process.env.REACT_APP_API_ROOT;


class ExpensesStore {
  constructor() {
    this.fetchExpenses()
  }

  @observable expenses = []
  @observable userIdFilter = null
  @observable fetchStatus = 'pending'

  @computed get
  filteredExpenses() {
    if (!this.userIdFilter) { return this.expenses }
    const filtered = this.expenses.filter(exp => exp.user_id === this.userIdFilter)
    return filtered
  }

  @computed get
  expensesTotal() {
    return this.filteredExpenses.reduce((sum, exp) => sum + exp.price, 0)
  }

  @action.bound
  setUserIdFilter(userId) {
    // show unfiltered if same user
    this.userIdFilter = this.userIdFilter === userId ? null : userId
  }

  @action
  setDone(expId) {
    // TODO: update the row!
    const expense = this.expenses.find(exp => exp.id === expId)
    expense.done = !expense.done
  }

  @action.bound
  addExpense(expense) {
    const options = {
      method: 'POST',
      headers: minimalHeaders,
      body: JSON.stringify(expense)
    }
    fetch(API_ROOT + '/expenses', options)
      .then(response => {
        if (response.status === 201) {
          this.fetchExpenses()
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

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

export default ExpensesStore