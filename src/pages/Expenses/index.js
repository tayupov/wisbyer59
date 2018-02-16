import React from 'react'
import { Container, Popup, Icon } from 'semantic-ui-react'

import ExpensesList from './ExpensesList'
import ExpensesForm from './ExpensesForm'

import expensesStore from 'stores/expensesStore'

const API = 'https://wisbyer59-api.herokuapp.com/';
const USER_PATH = 'users?';
const EXPENSE_PATH = 'expenses?';

const HEADERS = new Headers({
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
});

class Expenses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {id: 1},
      users: [],
      expenses: [],
      visibilityFilter: null
    }
  }

  componentDidMount() {
    fetch(API + EXPENSE_PATH)
      .then(response => response.json())
      .then(expenses => this.setState({
        expenses
      }));

    fetch(API + USER_PATH)
      .then(response => response.json())
      .then(users => this.setState({
        users
      }))
  }

  setUser = (user) => {
    this.setState({ user })
  }

  addExpense = (expense) => {
    const options = {
      headers: HEADERS,
      method: 'POST',
      body: JSON.stringify(expense)
    }
    fetch(API + EXPENSE_PATH, options)
      .then(response => response.json())
      .then(data => {
        this.setState({ expenses: this.state.expenses.concat(data) })
      });
  }

  deleteExpense = (expenseId) => {
    const options = {
      headers: HEADERS,
      method: 'DELETE',
    }
    const query = `id=eq.${expenseId}`

    fetch(API + EXPENSE_PATH + query, options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          expenses: this.state.expenses.filter(expense => expense.id !== expenseId)
        });
      });
  }

  render() {
    // const loggedIn = Object.keys(this.state.user).length !== 0;
    // const usersAvailable = this.state.users.length > 0;
    const { visibilityFilter } = this.state

    return (
      <Container id='content'>
        {/* {(!loggedIn && usersAvailable) && <UserLogin users={this.state.users} setUser={this.setUser} />} */}
        <ExpensesList users={this.state.users} expenses={this.state.expenses} deleteExpense={this.deleteExpense} />
        <Popup
          trigger={<Icon circular id='add-expense-sticky' size='big' name='plus' />}
          content={<ExpensesForm addExpense={this.addExpense} user={this.state.user} />}
          on='click'
          id='popup-sticky'
        />
      </Container>
    );
  }
}

export default Expenses;
