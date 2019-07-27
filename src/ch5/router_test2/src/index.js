import React from 'react';
import ReactDOM from 'react-dom';
import HelloApp2 from './HelloApp2';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<HelloApp2 />, document.getElementById('root'));
registerServiceWorker();
