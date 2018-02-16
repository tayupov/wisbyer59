import React from 'react'
import { List } from 'semantic-ui-react'

import categories from 'constants/categories'

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
    const users = this.props.users;
    const expenses = this.props.expenses;
    return (
      <List divided>
        {expenses.map((expense, index) => {
          const user = users.find((user) => user.id === expense.user_id);
          const category = categories.find((category) => category.key === expense.category)
          return (
            <List.Item key={index}>
              <List.Content floated='right'>
                <List.Header>{expense.price}€</List.Header>
                <List.Description>
                  {user ? user.name : 'loading...'}
                </List.Description>
              </List.Content>

              <List.Icon name={category.icon} size='large' verticalAlign='middle' />

              <List.Content>
                <List.Header>{expense.category}</List.Header>
                <List.Description>
                  {expense.description}
                </List.Description>
              </List.Content>

            </List.Item>
          );
        })}
      </List>
    );
  }
}

export default ExpensesList;