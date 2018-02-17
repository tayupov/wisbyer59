import React from 'react'
import { observer } from 'mobx-react'
import { Card, Image, Dimmer } from 'semantic-ui-react'

@observer
class UserLogin extends React.Component {

  onClickHandler = (event, card) => {
    const user = card.user;
    this.props.setActiveUser(user);
  }

  render() {
    const users = this.props.users;
    return (
      <Dimmer active>
        <Card.Group className='centered'>
          {users.map((user, index) => {
            return (
              <Card as='a' key={index} user={user} onClick={this.onClickHandler}>
                <Image src={user.image_url} />
                <Card.Content>
                  <Card.Header>
                    {user.name}
                  </Card.Header>
                  <Card.Description> 
                    {user.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
      </Dimmer>
    )
  }
}

export default UserLogin;