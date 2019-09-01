import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import Waves from 'node-waves'

import { History, Utils, Router } from '@app-init/ui'

const history = History.setHistory()
const utils = new Utils()


const store = utils.getStore()

Waves.attach('.btn', ['.waves-effect'])
Waves.init()

import AppContainer from '~/containers/AppContainer'
import Routes from '~/routes'

const App = () => {
  return (
    <Provider store={ store }>
      <Router history={ history } container={AppContainer} routes={Routes} />
    </Provider>
  )
}

const rootE = document.querySelector('react')

ReactDOM.render(
  <App />,
  rootE
)
