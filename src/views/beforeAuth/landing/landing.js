import React from 'react';

import './landing.scss';
import { Pathname } from '../../../pathname';
import MetaComponent from '../../../utils/metaComponent';

const Landing = () => {
	return (
		<div className="Landing">
			<MetaComponent
				title="Landing Page"
				description="This is the aos landing page"
				keywords="airport, operations, navigation, airport management"
				location={window.location}
				image="og_image.png"
			/>
			<div className="Landing--Home" id="home">
				<div className="Landing--HomeAnimation">
					<video className="Landing--HomeAnimationVideo" autoPlay={true} muted loop={true} playsInline>
						<source
							src="https://ak.picdn.net/shutterstock/videos/1063309405/preview/stock-footage-modern-office-portrait-of-beautiful-authentic-specialist-with-short-pink-hair-standing-holding.webm"
							type="video/mp4"
						/>
					</video>
				</div>
				<div className="Landing--HomeContent">
					<div className="Landing--HomeContentTop">
						<h1 className="Landing--SubTitle">
							Introducing Dummy
							<span style={{ fontWeight: '700' }}>Land,</span>
						</h1>
						<h1 className="Landing--Para">
							This is the hero section. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
							fugiat perspiciatis temporibus ut impedit expedita maiores officiis porro? At commodi
							suscipit atque eligendi cumque? Impedit magnam eligendi fugiat. Non, quam.
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
