import React from 'react'
import { observer } from 'mobx-react'
import { Container, Popup, Icon } from 'semantic-ui-react'
import { userStore, expensesStore } from 'stores'

import UserLogin from 'components/UserLogin'

import TopBar from './TopBar'
import ExpensesList from './ExpensesList'
import ExpensesForm from './ExpensesForm'

@observer
class Expenses extends React.Component {

  render() {
    const loggedIn = userStore.activeUser !== null;
    const usersAvailable = userStore.users.length > 0;
    return (
      <Container>
        <div className='main'>
          {(!loggedIn && usersAvailable) &&
            <UserLogin
              users={userStore.users}
              setActiveUser={userStore.setActiveUser}
            />
          }
          <TopBar
            userStore={userStore}
            expensesStore={expensesStore}
          />
          <ExpensesList
            userStore={userStore}
            expensesStore={expensesStore}
          />
          <Popup
            trigger={<Icon circular id='add-expense-sticky' size='big' name='plus' />}
            content=
            {<ExpensesForm
              addExpenses={expensesStore.addExpenses}
              users={userStore.users}
              activeUser={userStore.activeUser}
            />}
            on='click'
            id='popup-sticky'
          />
        </div>
      </Container>
    );
  }
}

export default Expenses;
