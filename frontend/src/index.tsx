/*import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5'
import ReactDOM from 'react-dom/client'

import * as serviceWorker from './serviceWorker'
import App from './Core/App'

import './index.scss'

const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
}

export const queryClient = new QueryClient(queryConfig)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <QueryParamProvider adapter={ReactRouter5Adapter}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </QueryParamProvider>
  </HashRouter>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()*/
