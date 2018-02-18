import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'semantic-ui-react'

@observer
class Filters extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event, button) {
    const filter = button.filter
    const setFilter = this.props.expensesStore.setFilter
    const activeUser = this.props.userStore.activeUser
    setFilter(filter, activeUser.id)
  }

  render() {
    const filter = this.props.expensesStore.filter
    return (
      <div>
        <Button
          basic
          filter='debtor'
          active={filter === 'debtor_id'}
          onClick={this.handleClick}
          content='Show my debts'
        />
        <Button
          basic
          filter='creator'
          active={filter === 'creator_id'}
          onClick={this.handleClick}
          content='Show my expenses'
        />
      </div>
    )
  }
}

export default Filters