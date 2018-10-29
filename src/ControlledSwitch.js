import React, { Fragment } from 'react'
import { Switch } from 'react-router-dom'

import { LocationContext } from './context'

const ControlledSwitch = (props) => {
	return (
		<LocationContext.Consumer>
			{(data) => (
				<Fragment>
					<Switch location={data.location}>{props.children}</Switch>
					{/*This one strictly handles preloading*/}
					<div style={{ display: 'none' }}>
						{data.nextLocation && (
							<Switch location={data.nextLocation}>{props.children}</Switch>
						)}
					</div>
				</Fragment>
			)}
		</LocationContext.Consumer>
	)
}

export default ControlledSwitch
