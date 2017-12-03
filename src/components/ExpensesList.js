import React from 'react'
import { List, Icon } from 'semantic-ui-react'

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
      <List>
        {expenses.map((expense, index) => {
          return (
            <List.Item key={index}>
              <Icon name='delete' onClick={() => this.onClickHandler(expense.id)} />
              <List.Content>{expense.description}</List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  }
}

export default ExpensesList;