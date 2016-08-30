import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/app.js';

injectTapEventPlugin();

render(<App />, document.getElementById('app'));