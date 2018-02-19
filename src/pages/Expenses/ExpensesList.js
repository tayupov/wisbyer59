import React from 'react'
import { observer } from 'mobx-react'
import { List } from 'semantic-ui-react'

import PaymentButtons from './PaymentButtons'
import categories from 'constants/categories'

@observer
class ExpensesList extends React.Component {

  constructor(props) {
    super(props)
    this.totalItem = this.totalItem.bind(this)
  }

  totalItem = (expensesTotal) => (
    <List.Item>
      <List.Content floated='right'>
        <List.Header className='expense-price'>{expensesTotal}€</List.Header>
        <List.Description>Total</List.Description>
      </List.Content>
    </List.Item>
  )

  render() {
    const { userStore, expensesStore } = this.props
    const { users } = userStore
    const { filteredExpenses, expensesTotal } = expensesStore

    return (
      <div>
        <List divided>

          {filteredExpenses.map((expense, index) => {
            const creator = users.find((user) => user.id === expense.creator_id);
            const category = categories.find((category) => category.key === expense.category)

            return (
              <List.Item key={index}>

                <List.Content floated='right'>
                  <List.Header className='expense-price'>
                    {expense.price}€
                  </List.Header>
                  <List.Description>
                    {creator ? creator.name : 'loading...'}
                  </List.Description>
                </List.Content>

                <PaymentButtons 
                  expense={expense}
                  expensesStore={expensesStore}
                />

                <List.Icon name={category.icon} size='large' verticalAlign='middle'/>

                <List.Content>
                  <List.Header>{category.text}</List.Header>
                  <List.Description>
                    {expense.description}
                  </List.Description>
                </List.Content>

              </List.Item>
            );
          })}

          {filteredExpenses.length > 0 && this.totalItem(expensesTotal)}

        </List>
      </div>
    );
  }
}

export default ExpensesList;