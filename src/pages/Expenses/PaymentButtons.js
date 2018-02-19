import React from 'react'
import { List, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react';

@observer
class PaymentButtons extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event, element) {
    const expense = this.props.expense
    const payload = {
      paid: !expense.paid 
    }
    this.props.expensesStore.updateExpense(expense, payload)
  }

  render() {
    const expense = this.props.expense
    return (
      <List.Content as={Button.Group} floated='right'>
        <Button
          onClick={this.handleClick}
          disabled={expense.paid}
          content='Paid'
          compact
          positive
        />
        <Button
          onClick={this.handleClick}
          disabled={!expense.paid}
          content='Unpaid'
          compact
          negative
        />
      </List.Content>
    )
  }
}

export default PaymentButtons