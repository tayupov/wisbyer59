import React from 'react'
import { Container } from 'semantic-ui-react'

import UserLogin from './UserLogin';
import ExpensesList from './ExpensesList'
import ExpensesForm from './ExpensesForm'

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
      user: {},
      users: [],
      expenses: [],
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
    console.log(user)
  }

  addExpense = (expense) => {
    const options = {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify(expense)
    }
    fetch(API + EXPENSE_PATH, options)
      .then(response => response.json())
      .then(data => {
        this.setState({ expenses: this.state.expenses.concat(data)})
      });
  }

  deleteExpense = (expenseId) => {
    const options = {
      headers: HEADERS,
      method: "DELETE",
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
    const loggedIn = Object.keys(this.state.user).length !== 0;
    return (
      <Container>
        {!loggedIn && <UserLogin users={this.state.users} />}
        <ExpensesList expenses={this.state.expenses} deleteExpense={this.deleteExpense}/>
        <ExpensesForm addExpense={this.addExpense} user={this.state.user} />
      </Container>
    );
  }
}

export default Expenses;
