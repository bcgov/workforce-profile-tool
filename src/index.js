import React from 'react'
import ReactDOM from 'react-dom'
import App from './Core/App'
import registerServiceWorker from './registerServiceWorker'
import './bootstrap/bootstrap.css'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
