import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'
import registerServiceWorker from './registerServiceWorker'

import './sass/index.css'

ReactDOM.render(<Routes />, document.getElementById('root'))
registerServiceWorker()
