import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import Loadable from 'react-loadable'

import { LocationContext, ControlledLocationProvider } from './context'
import ControlledSwitch from './ControlledSwitch'
import ControlledRoute from './ControlledRoute'
import ControlledLink from './ControlledLink'
import ProgressBar from './ProgressBar'

import styles from './styles'

const App = Loadable({
	loader: () => import('./pages/App'),
	loading: () => null,
})
const Page1 = Loadable({
	loader: () =>
		new Promise((res, rej) => {
			console.log('1 Second Route')
			return setTimeout(() => {
				res(import('./pages/Page1'))
			}, 1000)
		}),
	loading: () => null,
})
const Page2 = Loadable({
	loader: () =>
		new Promise((res, rej) => {
			console.log('2 Second Route')
			return setTimeout(() => {
				res(import('./pages/Page2'))
			}, 2000)
		}),
	loading: () => null,
})
const Page3 = Loadable({
	loader: () =>
		new Promise((res, rej) => {
			console.log('3 Second Route')
			return setTimeout(() => {
				res(import('./pages/Page3'))
			}, 3000)
		}),
	loading: () => null,
})
const Page4 = Loadable({
	loader: () =>
		new Promise((res, rej) => {
			console.log('4 Second Route')
			return setTimeout(() => {
				res(import('./pages/Page4'))
			}, 4000)
		}),
	loading: () => null,
})
const NotFound = Loadable({
	loader: () => import('./pages/NotFound'),
	loading: () => null,
})

class WrappedApp extends Component {
	render() {
		return (
			<div>
				<LocationContext.Consumer>
					{(data) => data.loading && <ProgressBar />}
				</LocationContext.Consumer>
				<ul style={styles.ul}>
					<li style={styles.li}>
						<ControlledLink to="/" style={styles.link}>
							Home
						</ControlledLink>
					</li>
					<li style={styles.li}>
						<ControlledLink to="/page1" style={styles.link}>
							Page1
						</ControlledLink>
					</li>
					<li style={styles.li}>
						<ControlledLink to="/page2" style={styles.link}>
							Page2
						</ControlledLink>
					</li>
					<li style={styles.li}>
						<ControlledLink to="/page3" style={styles.link}>
							Page3
						</ControlledLink>
					</li>
					<li style={styles.li}>
						<ControlledLink to="/page4/SomeUID" style={styles.link}>
							Page4
						</ControlledLink>
					</li>
					<li style={styles.li}>
						<ControlledLink to="/notFound" style={styles.link}>
							Not Found
						</ControlledLink>
					</li>
					<li style={styles.li}>
						<ControlledLink to="/notFound2" style={styles.link}>
							Not Found2
						</ControlledLink>
					</li>
				</ul>
				<ControlledSwitch>
					<ControlledRoute exact path="/" component={App} />
					<ControlledRoute path="/page1" component={Page1} />
					<ControlledRoute path="/page2" component={Page2} />
					<ControlledRoute path="/page3" component={Page3} />
					<ControlledRoute path="/page4/:uid" component={Page4} />
					<ControlledRoute component={NotFound} />
				</ControlledSwitch>
			</div>
		)
	}
}

class Base extends Component {
	render() {
		return (
			<Router>
				<ControlledLocationProvider>
					<WrappedApp />
				</ControlledLocationProvider>
			</Router>
		)
	}
}

ReactDOM.render(<Base />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

