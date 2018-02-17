import React from 'react'
import { observer } from 'mobx-react'
import { Container, Popup, Icon } from 'semantic-ui-react'
import { userStore, expensesStore } from 'stores'

import UserLogin from 'components/UserLogin'

import ExpensesList from './ExpensesList'
import ExpensesForm from './ExpensesForm'


const API = 'https://wisbyer59-api.herokuapp.com/';
const EXPENSE_PATH = 'expenses?';

@observer
class Expenses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: { id: 1 }
    }
  }

  // deleteExpense = (expenseId) => {
  //   const options = {
  //     headers: HEADERS,
  //     method: 'DELETE',
  //   }
  //   const query = `id=eq.${expenseId}`

  //   fetch(API + EXPENSE_PATH + query, options)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         expenses: this.state.expenses.filter(expense => expense.id !== expenseId)
  //       });
  //     });
  // }

  render() {
    const loggedIn = userStore.activeUser !== null;
    const usersAvailable = userStore.users.length > 0;
    return (
      <Container>
        <div id='content'>
          {(!loggedIn && usersAvailable) &&
            <UserLogin
              users={userStore.users}
              setActiveUser={userStore.setActiveUser}
            />
          }
          <ExpensesList
            expensesStore={expensesStore}
            users={userStore.users}
            activeUser={userStore.activeUser}
            deleteExpense={this.deleteExpense} />
          <Popup
            trigger={<Icon circular id='add-expense-sticky' size='big' name='plus' />}
            content=
            {<ExpensesForm
              addExpense={expensesStore.addExpense}
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
