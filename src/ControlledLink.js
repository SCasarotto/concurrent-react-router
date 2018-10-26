import React from 'react'
import { Link } from 'react-router-dom'

import { LocationContext } from './context'

const ControlledLink = (props) => {
	//
	// Toggle Replace to true when a nextLocation has been set.
	//	This stops multiple history entries to be added. Only the last
	//	navigation is saved in your history.
	//
	return (
		<LocationContext.Consumer>
			{(data) => <Link {...props} style={{ color: 'white' }} replace={!!data.nextLocation} />}
		</LocationContext.Consumer>
	)
}

export default ControlledLink
