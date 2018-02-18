import _ from 'lodash'
import { observable, computed, action } from 'mobx'
import minimalHeaders from 'constants/minimalHeaders'

const API_ROOT = process.env.REACT_APP_API_ROOT

class ExpensesStore {
  constructor() {
    this.fetchExpenses()
  }

  @observable expenses = []
  @observable fetchStatus = 'pending'

  @observable filter = null
  @observable userIdFilter = null

  @computed get
  filteredExpenses() {
    if (!this.userIdFilter) { return this.uniqueExpenses }
    const filtered = this.uniqueExpenses.filter(exp => exp[this.filter] === this.userIdFilter)
    return filtered
  }

  @computed get
  uniqueExpenses() {
    return _.uniqBy(this.expenses, 'created_at')
  }

  @computed get
  expensesTotal() {
    return this.filteredExpenses.reduce((sum, exp) => sum + exp.price, 0)
  }

  @action.bound
  setFilter(filter, userId) {
    // same button press, disable filters
    if (this.filter === `${filter}_id`) {
      this.filter = null
      this.userIdFilter = null
      return
    }
    this.filter = `${filter}_id`
    this.userIdFilter =  userId
  }

  @action
  setDone(expId) {
    // TODO: update the row!
    const expense = this.expenses.find(exp => exp.id === expId)
    expense.done = !expense.done
  }

  @action.bound
  addExpenses(expenses) {
    const options = {
      method: 'POST',
      headers: minimalHeaders,
      body: JSON.stringify(expenses)
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