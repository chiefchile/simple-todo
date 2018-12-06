import { default as React } from 'react';
import Title from './title';

interface Props {
	titles: Title[],
	onClick(_id: string): void
}

export const TitleList = (props: Props) => {

	return (
		<div>
			<h4>Notes</h4>
			<ul>
				{props.titles.map((title: Title) =>
					<li key={title._id}>
						<a href="#" onClick={() => props.onClick(title._id)}>{title.title}</a>
					</li>)}
			</ul>
		</div>
	)

}