import { default as React } from 'react';

export const TitleList = (props) => {

	return (
		<div>
			<h4>Notes</h4>
			<ul>
				{props.titles.map(title => 
				<li key={title._id}>
					<a href="#" onClick={() => props.onClick(title._id)}>{title.title}</a>
				</li>)}
			</ul>
		</div>
	)
	
}