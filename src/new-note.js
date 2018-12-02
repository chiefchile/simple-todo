import { default as React } from 'react';
import { Formik, Form, Field } from 'formik';
import './new-note.css';

export const NewNote = ({onSubmit, user}) => {
  return (
  <div>
    <h2>New Note</h2>
    <Formik
      initialValues={{ title: '', note: '', user: user}}
      onSubmit={(values, { setSubmitting }) => {
		  setSubmitting(false);
		  onSubmit(values);
      }}
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
            Create note
          </button>
		  
        </Form>
      )}
    </Formik>
  </div>
)};