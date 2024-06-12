import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import App from './app.jsx';
import { SocketProvider } from './socket/socketContext.js';


ReactDOM.render(
	<Provider store={Store}>
		<BrowserRouter>
			<SocketProvider>
				<App />
			</SocketProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
