import { default as React } from 'react';
import Title from './title';
import Result from './result';

interface Props {
	titles: Title[],
	onClick(_id: string | undefined, result: Result | null): void
}

export const TitleList = (props: Props) => {

	return (
		<div>
			<h4>Notes</h4>
			<ul>
				{props.titles.map((title: Title) =>
					<li key={title._id}>
						<a href="#" onClick={() => props.onClick(title._id, null)}>{title.title}</a>
					</li>)}
			</ul>
		</div>
	)

}