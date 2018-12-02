import { default as React } from 'react';
import { Formik, Form, Field } from 'formik';

export const Note = ({note, onUpdate, onDelete}) =>  {
	console.log(note);
	
	return (
	  <div>
		<Formik
		  initialValues={{ title: note.title, note: note.note, user: note.user, _id: note._id}}
		  onSubmit={(values, { setSubmitting }) => {
			  setSubmitting(false);
			  onUpdate(values);
		  }}
		  enableReinitialize={true}
		>
		  {({ isSubmitting }) => (
			<Form>
			  <div>
				  <label>Title: </label>
				  <Field id="title" type="text" name="title" />
			  </div>
			  
			  <div>
				  <label>Note: </label>
				  <Field id="note" component="textarea" name="note" />
			  </div>
			  
			  <button type="submit" disabled={isSubmitting}>
				Update note
			  </button>
			  
			  <button onClick={() => onDelete(note._id)} type="button">
				Delete note
			  </button>
			  
			  
			  
			</Form>
		  )}
		</Formik>
		
		
	  </div>
)};