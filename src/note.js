import { default as React } from 'react';

export const Note = ({note}) =>  {

	return (
		<div>
			<h4>{note.title}</h4>
			<div id="note">{note.note}</div>
		</div>
	)
	
}