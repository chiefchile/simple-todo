import { default as React } from 'react';
import { Formik, Form, Field } from 'formik';
import {Message} from './message.js';

export const Note = ({note, onUpdate, onDelete, message}) =>  {
	console.log(note);
	
	return (
	  <div>
		<h3 className="page-header">View Note</h3>
		<Message message={message} />
		<Formik
		  initialValues={{ title: note.title, note: note.note, user: note.user, _id: note._id}}
		  onSubmit={(values, { setSubmitting }) => {
			  setSubmitting(false);
			  onUpdate(values);
		  }}
		  enableReinitialize={true}
		>
		  {({ isSubmitting }) => (
			<Form className="form-horizontal">
			  <div className="form-group">
				  <label className="col-md-1 control-label">Title: </label>
				  <div className="col-md-9">
					<Field className="form-control" id="title" type="text" name="title" />
				  </div>
			  </div>
			  
			  <div className="form-group">
				  <label className="col-md-1 control-label">Note: </label>
				  <div className="col-md-9">
					<Field className="form-control" id="note" component="textarea" name="note" />
				  </div>
			  </div>
			  
			  <div className="col-md-3 col-md-offset-1">
				  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
					Update note
				  </button>
			  </div>
			  
			  <button className="btn btn-primary" onClick={() => onDelete(note._id)} type="button">
				Delete note
			  </button>
			  
			  
			  
			</Form>
		  )}
		</Formik>
		
		
	  </div>
)};