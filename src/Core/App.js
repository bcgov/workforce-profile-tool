import React, { Component } from 'react'
import '../bootstrap/bootstrap.css'
import './App.css'
import Header from './Header'
import VariableList from '../Variables/VariableList'

class App extends Component {
  render () {
    return (
      <div className='App container-fluid'>
        <Header />
        <div className='row'>
          <div className='col-3'>
            <VariableList />
          </div>
          <div className='col-9'>
            {/* <Main /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default App
