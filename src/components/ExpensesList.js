import React from 'react'
import { List } from 'semantic-ui-react'

class ExpensesList extends React.Component {

  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler = (expenseId) => {
    this.deleteExpense(expenseId);
  }

  deleteExpense = (expenseId) => {
    this.props.deleteExpense(expenseId);
  }

  render() {
    const expenses = this.props.expenses;
    return (
      <List divided relaxed>
        {expenses.map((expense, index) => {
          return (
            <List.Item key={index}>
              <List.Icon name='delete' verticalAlign="middle" onClick={() => this.onClickHandler(expense.id)} />
              <List.Content>
                <List.Header>{expense.price}</List.Header>
                <List.Description>{expense.description}</List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  }
}

export default ExpensesList;