import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export const LocationContext = React.createContext()

class LocationProvider extends Component {
	state = {
		loading: false,
		location: undefined,
		nextLocation: undefined,
		startLoading: () => {
			this.setState({ loading: true })
		},
		stopLoading: () => {
			this.setState({ loading: false })
		},
		updateLocation: () => {
			const { nextLocation } = this.state
			this.setState({
				loading: false,
				location: nextLocation,
				nextLocation: undefined,
			})
		},
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		//INIT
		if (!prevState.location) {
			return { ...prevState, location: nextProps.location }
		}

		//Update Location
		if (prevState.location.pathname !== nextProps.location.pathname) {
			return { ...prevState, nextLocation: nextProps.location }
		}

		return prevState
	}
	render() {
		return (
			<LocationContext.Provider value={this.state}>
				{this.props.children}
			</LocationContext.Provider>
		)
	}
}

export const ControlledLocationProvider = withRouter(LocationProvider)
