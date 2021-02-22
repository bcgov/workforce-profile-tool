import { HashRouter, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceWorker'
import App from './Core/App'

import './bootstrap/bootstrap.scss'
import './index.scss'
import { QueryParamProvider } from 'use-query-params'

const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
}

const queryClient = new QueryClient(queryConfig)

ReactDOM.render(
  <HashRouter>
    <QueryParamProvider ReactRouterRoute={Route}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </QueryParamProvider>
  </HashRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
