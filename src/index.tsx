import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'assets/styles/common.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), 
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
