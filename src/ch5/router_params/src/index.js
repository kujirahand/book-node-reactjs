import React from 'react';
import ReactDOM from 'react-dom';
import CustomerApp from './CustomerApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<CustomerApp />, document.getElementById('root'));
registerServiceWorker();
