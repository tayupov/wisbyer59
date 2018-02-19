import React from 'react'
import { Header } from 'semantic-ui-react'
import { observer } from 'mobx-react'

@observer
class Balance extends React.Component {
  render() {
    const { userStore, expensesStore } = this.props
    const user = userStore.activeUser

    const expenses = expensesStore.expenses
      .filter(exp => exp.creator_id === user.id)
      .reduce((sum, exp) => sum + exp.price, 0)

    const debt = expensesStore.expenses
      .filter(exp => exp.debtor_id === user.id)
      .filter(exp => !exp.paid)
      .reduce((sum, debt) => sum + debt.price, 0)

    const totalBalance = expenses - debt
    const balanceColor = totalBalance >= 0 ? '#21ba45' : '#db2828'
    
    return (
      <Header.Subheader>
        Your balance is <span className='balance' style={{ color: balanceColor }}>{totalBalance}€</span>
      </Header.Subheader>
    )
  }
}

export default Balance