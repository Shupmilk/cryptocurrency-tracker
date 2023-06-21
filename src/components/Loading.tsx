import React from 'react';
import './Loading.css';

export const Loading = () => {
	return (
		<div className="loading-container">
			<div className="loading">
				<div className="loading__content">
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	);
};
