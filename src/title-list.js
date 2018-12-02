import { default as React } from 'react';

export const TitleList = (props) => {

	return (
		<ul>
			{props.titles.map(title => 
			<li key={title._id}>
				<a href="#" onClick={() => props.onClick(title._id)}>{title.title}</a>
			</li>)}
		</ul>
	)
	
}