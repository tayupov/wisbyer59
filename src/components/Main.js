import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from 'components/NavBar'

import Expenses from 'pages/Expenses'
import Insights from 'pages/Insights'

class Main extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <NavBar />
        </nav>
        <main>
          <Switch>
            <Route path='/insights' component={Insights} />
            <Route path='/' component={Expenses} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default Main