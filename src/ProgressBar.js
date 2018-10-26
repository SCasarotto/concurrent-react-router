import React, { Component } from 'react';

const styles = {
	wrapper: {
		position: 'fixed',
		width: '100%',
		height: 3,
		top: 0,
		left: 0
	},
	bar: (percentage) => ({
		width: `${percentage}%`,
		backgroundColor: 'red',
		height: '100%',
		transition: 'width 0.2s ease-in'
	})
}

class ProgressBar extends Component {
	state = {
		percentage: 0,
		interval: undefined,
	}

	componentDidMount() {
		this._isMounted = true
		this.setState({ interval: setInterval(this.updatePercentage, 200) })
	}
	componentWillUnmount() {
		clearInterval(this.state.interval)
		this._isMounted = false
	}

	updatePercentage = () => {
		const { percentage } = this.state
		//Thank you react-redux-loading-bar for function
		// - https://github.com/mironov/react-redux-loading-bar/blob/master/src/loading_bar.js
		const newPercent = percentage + (10 * Math.cos(percentage * (Math.PI / 2 / 100)))
		if (this._isMounted && newPercent < 99) {
			this.setState({ percentage: newPercent })
		}
	}

	render() {
		return (
			<div style={styles.wrapper} >
	        	<div style={styles.bar(this.state.percentage)}/>
	      	</div>
		)
	}
}

export default ProgressBar