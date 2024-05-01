import { Card } from 'antd';
import React from 'react';
import './style.scss';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import Chip from '../../../../components/chip/chip';
import ButtonComponent from '../../../../components/button/button';
import { useNavigate } from 'react-router-dom';

const Alerts = () => {
	const navigate = useNavigate();
	const handleAcknowledge = () => {
		navigate('/plans', { state: { tab: '3' } });
	};
	return (
		<Card className="progress-alert">
			<div className="alert-body">
				<CustomTypography type="title" fontSize={16} fontWeight="600" color="black" children="Alerts" />
				<div className="alert-status-body">
					<Chip text="critical" className="alert-status" />
					<div>12:00 UTC</div>
				</div>
				<div className="alert-button-body">
					<div className="alert-conflict">
						<div className="conflict-type">Belt Conflict</div>
						<div className="conflict-flight">UAL1225 with 6E1223</div>
					</div>
					<ButtonComponent onClick={handleAcknowledge} title="Acknowledge" type="filledText" />
				</div>
			</div>
		</Card>
	);
};

export default Alerts;
