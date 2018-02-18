import React from 'react'
import { Header, Divider } from 'semantic-ui-react'

import Filters from './Filters'

class TopBar extends React.Component {
  render() {
    const { userStore, expensesStore } = this.props
    const user = userStore.activeUser
    return (
      <div>
        {user &&
          <Header as='h1' floated='right'>
            {`Hi, ${user.name}`}
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