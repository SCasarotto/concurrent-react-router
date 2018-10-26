import React, { Component } from 'react'
import { matchPath } from 'react-router'
import { Route } from 'react-router-dom'

import { LocationContext } from './context'

class ControlledRoute extends Component {
	state = { firstLoad: true }
	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.firstLoad &&
			(matchPath(nextProps.location.pathname, nextProps) || !nextProps.path)
		) {
			console.log('INIT Loading for', nextProps.path)
			nextProps.startLoading()
			nextProps.component
				.preload()
				.then((response) => {
					if (matchPath(nextProps.location.pathname, nextProps) || !nextProps.path) {
						nextProps.updateLocation()
					}
				})
				.catch((error) => {
					console.log(error)
				})

			return { ...prevState, firstLoad: false }
		}

		if (
			nextProps.nextLocation &&
			prevState.firstLoad &&
			(matchPath(nextProps.nextLocation.pathname, nextProps) || !nextProps.path)
		) {
			console.log('Start Loading for', nextProps.path)
			nextProps.startLoading()
			nextProps.component
				.preload()
				.then((response) => {
					if (matchPath(nextProps.nextLocation.pathname, nextProps) || !nextProps.path) {
						nextProps.updateLocation()
					}
				})
				.catch((error) => {
					console.log(error)
				})

			return { ...prevState, firstLoad: false }
		}

		return prevState
	}

	render() {
		return <Route {...this.props} />
	}
}
export default (props) => {
	return (
		<LocationContext.Consumer>
			{(data) => {
				//I don't want to pass all props because it will cause many renders
				const { location, nextLocation, startLoading, updateLocation } = data
				return (
					<ControlledRoute
						{...props}
						location={location}
						nextLocation={nextLocation}
						startLoading={startLoading}
						updateLocation={updateLocation}
					/>
				)
			}}
		</LocationContext.Consumer>
	)
}
