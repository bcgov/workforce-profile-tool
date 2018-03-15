import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Main from './Main'
import VariableList from '../Variables/VariableList'

class App extends Component {
  render () {
    return (
      <div className='App container-fluid'>
        <div className='row'>
          <div className='LeftColumn col-3'>
            <Header />
            <VariableList />
          </div>
          <div className='col-9'>
            <Main />
          </div>
        </div>
      </div>
    )
  }
}

export default App
