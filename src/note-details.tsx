import { default as React, Fragment } from 'react';
import { Formik, Form, Field } from 'formik';

export const NoteDetails = () => {
	return (
		<Fragment>
		<div className="form-group">
			<label htmlFor="title" className="col-md-1 control-label">Title: </label>
			<div className="col-md-10">
				<Field className="form-control" id="title" type="text" name="title" />
			</div>
		</div>

		<div className="form-group">
			<label htmlFor="note" className="col-md-1 control-label">Note: </label>
			<div className="col-md-10">
				<Field className="form-control" id="note" component="textarea" name="note" />
			</div>
		</div>
		</Fragment>
	)
}
