import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Container, Menu, Icon, Responsive } from 'semantic-ui-react'

class NavBar extends React.Component {
  render() {
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Sidebar vertical visible width={'thin'} as={Menu} icon='labeled'>

          <Container>
            <Menu.Item as={Link} to='/'>
              <Icon name='home' />
            </Menu.Item>
            <Menu.Item as={Link} to='/insights'>
              <Icon name='bar graph' />
            </Menu.Item>
          </Container>

        </Sidebar>
      </Responsive>
    )
  }
}

export default NavBar