import React from 'react';

export const Message = ({message}) => {
	if (message) {
		const className = `alert alert-${message.type}`;
		return (

				<div className={className} role="alert">{message.msg}</div>
			
		)
	} else {
		return null;
	}
}