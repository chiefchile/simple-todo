import { Component, Fragment, default as React } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './new-note.css';

const API_HOST = 'http://localhost:3002';
// const API_HOST = 'https://alex-simple-todo.herokuapp.com';

export const NewNote = (props) => (
  <div>
    <h2>New Note</h2>
    <Formik
      initialValues={{ title: '', note: '', user: props.user}}
      onSubmit={(values, { setSubmitting }) => {
		  setSubmitting(false);
		  axios.post(`${API_HOST}/note`, values)
			.then(response => console.log(response))
			.catch(function (error) {
			  console.log(error);
			});
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
);