import React from 'react'
import { observer } from 'mobx-react'
import { List, Button } from 'semantic-ui-react'

import categories from 'constants/categories'

@observer
class ExpensesList extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event, button) {
    this.props.expensesStore.setUserIdFilter(this.props.activeUser.id)
  }

  render() {
    const { activeUser, users, expensesStore } = this.props
    const { filteredExpenses, expensesTotal, userIdFilter } = expensesStore
    
    const buttonActive = activeUser ? activeUser.id === userIdFilter : false
    return (
      <div>
        <Button basic onClick={this.handleClick} active={buttonActive}>Only my expenses</Button>
        <List divided>

          {filteredExpenses.map((expense, index) => {
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
          
          <List.Item>
            <List.Content floated='right'>
              <List.Header>{expensesTotal}€</List.Header>
              <List.Description>Total</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default ExpensesList;