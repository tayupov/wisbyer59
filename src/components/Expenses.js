import React from 'react'
import { Container } from 'semantic-ui-react'

import ExpensesList from './ExpensesList'
import ExpensesForm from './ExpensesForm'

const API = 'https://wisbyer59-api.herokuapp.com/';
const EXPENSE_PATH = 'expenses?';

const headers = new Headers({
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
});

class Expenses extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      userId: 2
    }
  }

  componentDidMount() {
    fetch(API + EXPENSE_PATH)
      .then(response => response.json())
      .then(data => this.setState({ expenses: data }));
  }

  addExpense = (expense) => {
    const options = {
      headers,
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
      headers,
      method: "DELETE",
    }
    const query = `id=eq.${expenseId}`

    fetch(API + EXPENSE_PATH + query, options)
      .then(response => response.json)
      .then(data => {
        this.setState({
          expenses: this.state.expenses.filter(expense => expense.id !== expenseId)
        });
      });
  }

  render() {
    return (
      <Container>
        <ExpensesList expenses={this.state.expenses} deleteExpense={this.deleteExpense}/>
        <ExpensesForm addExpense={this.addExpense} userId={this.state.userId} />
      </Container>
    );
  }
}

export default Expenses;
