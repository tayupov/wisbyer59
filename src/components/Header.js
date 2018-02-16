import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

class XHeader extends React.Component {
  render() {
    return (
      <Header as='h2' icon textAlign='center'>
        <Icon name='money' circular />
        <Header.Content>
          Wisbyer59
        </Header.Content>
      </Header>
    )
  }
}


export default XHeader;