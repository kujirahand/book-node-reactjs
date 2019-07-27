import React from 'react';
import ReactDOM from 'react-dom';
import HelloApp from './HelloApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<HelloApp/>, document.getElementById('root'));
registerServiceWorker();
