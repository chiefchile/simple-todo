import { default as React } from 'react';
import { Formik, Form, Field } from 'formik';
import './new-note.css';

export const NewNote = ({onSubmit, user}) => {
  return (
	  <div>
	    <h3 className="page-header">New Note</h3>
		<Formik
		  initialValues={{ title: '', note: '', user: user}}
		  onSubmit={(values, { setSubmitting }) => {
			  setSubmitting(false);
			  onSubmit(values);
		  }}
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
					Create note
				  </button>
			  </div>
			  
			</Form>
		  )}
		</Formik>
	  </div>
)};