import { default as React } from 'react';

export const TitleList = (props) => {

	return (
		<ul>
			{props.titles.map(title => 
			<li key={title.noteId}>
				<a href="#" onClick={() => props.onClick(title.noteId)}>{title.title}</a>
			</li>)}
		</ul>
	)
	
}