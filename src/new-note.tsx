import { default as React } from 'react';
import { Formik, Form, Field } from 'formik';
import './new-note.css';
import Note from './note';
import { NoteDetails } from './note-details';

interface Props {
	onSubmit(note: Note): void,
	user: string
}

export const NewNote = ({ onSubmit, user }: Props) => {
	return (
		<div>
			<h4 className="page-header">New Note</h4>
			<Formik
				initialValues={{ title: '', note: '', user: user }}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					onSubmit(values);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="form-horizontal">
						<NoteDetails />

						<div className="col-md-3 col-md-offset-1">
							<button className="btn btn-primary" type="submit" disabled={isSubmitting}>
								Create note
							</button>
						</div>

					</Form>
				)}
			</Formik>
		</div>
	)
};