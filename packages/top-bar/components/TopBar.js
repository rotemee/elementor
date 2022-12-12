import React from 'react';
import { Slot } from '@elementor/locations';

export const TopBar = () => {
	return (
		<div style={ {
			background: '#000',
			height: '50px',
			width: '100%',
			color: '#fff',
			display: 'flex',
		} }>
			<img src="https://elementor.com/marketing/wp-content/uploads/2021/10/Elementor-Logo-Symbol-Red.png"
				alt="Elementor"
				style={ {
					height: '90%',
					marginTop: '2px',
					marginLeft: '4px',
				} }
			/>
			<Slot name="editor/top-bar/title">
				{ ( props ) => <h2>{ props.title }</h2> }
			</Slot>
		</div>
	);
};

export default TopBar;
