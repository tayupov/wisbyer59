import React from 'react'
import { observer } from 'mobx-react';
import { Header, Divider } from 'semantic-ui-react'

import Balance from './Balance'
import Filters from './Filters'

@observer
class TopBar extends React.Component {
  render() {
    const { userStore, expensesStore } = this.props
    const user = userStore.activeUser

    return (
      <div>
        {user &&
          <Header as='h3' floated='right'>
            {`Hi, ${user.name}`}
            <Balance
              userStore={userStore}
              expensesStore={expensesStore}
            />
          </Header>
        }
        <Filters
          userStore={userStore}
          expensesStore={expensesStore}
        />
        <Divider hidden />
      </div>
    )
  }
}

export default TopBar