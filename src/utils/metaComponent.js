import React from 'react';
import { Helmet } from 'react-helmet';
import propTypes from 'prop-types';

const MetaComponent = (props) => {
	let canonicalURL = props.location
		? `${props.location.protocol}//${props.location.host}${window.location.pathname}`
		: '';

	return (
		<Helmet>
			<title>{props.title}</title>
			<meta name="description" content={props.description} />
			<meta name="keywords" content={props.keywords} />
			{props.location && <link rel="canonical" href={`${canonicalURL}`} />}

			{/* {props.schema && <JsonLd data={props.schema} />} */}
		</Helmet>
	);
};

const JsonLd = ({ data }) => {
	return data.map((schema, index) => {
		return (
			<script
				key={index}
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
		);
	});
};

MetaComponent.propTypes = {
	title: propTypes.string,
	keywords: propTypes.string,
	description: propTypes.string,
	image: propTypes.string,
	schema: propTypes.arrayOf(propTypes.object),
	location: propTypes.object,
};

JsonLd.propTypes = {
	data: propTypes.arrayOf(propTypes.object),
};

export default MetaComponent;
