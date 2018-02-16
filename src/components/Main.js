import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from 'components/NavBar'

import Expenses from 'pages/Expenses'

class Main extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <NavBar />
        </nav>
        <main>
          <Switch>
            <Route exath path='/' component={Expenses} />
            <Route path='/distribution' />
          </Switch>
        </main>
      </div>
    )
  }
}

export default Main