import React, { Component } from 'react';

class NotFound extends Component {
	componentDidMount() {
		setTimeout(() => {
			// this.props.history.push('/');
		}, 2000);
	}

	render() {
		return (
			<div
				style={{
					textAlign: 'center',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<strong>
					<p>404</p>
				</strong>
				<hr />
				<p>Not Found</p>
			</div>
		);
	}
}

export default NotFound;
