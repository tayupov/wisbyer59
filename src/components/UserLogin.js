import React from 'react'
import { List, Card, Dimmer } from 'semantic-ui-react'

class UserLogin extends React.Component {

  render() {
    const users = this.props.user;
    return (
      <Dimmer active blurring>
        <List>
          
        </List>
      </Dimmer>
    )
  }
}

export default UserLogin;