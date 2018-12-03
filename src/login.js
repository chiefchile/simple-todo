import { default as React } from 'react';
import { Formik, Form, Field } from 'formik';
import { Message } from './message';

export const Login = ({history, onSubmit, onLoginAsGuest, loginResult}) => {

    return (
      <div className="container">
	    <h1 className="page-header">ToDo</h1>

			<div className="row">
				<div className="col-md-5 col-md-offset-3">
					<Message result={loginResult} />
				</div>
			</div>

			<Formik
				initialValues={{ username: '',  password: ''}}
				onSubmit={(values, { setSubmitting }) => {
								setSubmitting(false);
								onSubmit(values);
				}}
			>
		  {({ isSubmitting }) => (
			<Form className="form-horizontal">
			  <div className="form-group">
				  <label className="col-md-1 col-md-offset-3 control-label">Username: </label>
				  <div className="col-md-3">
					<Field className="form-control" id="username" type="text" name="username" />
				  </div>
			  </div>
			  
			  <div className="form-group">
				  <label className="col-md-1 col-md-offset-3 control-label">Password: </label>
				  <div className="col-md-3">
					<Field className="form-control" id="password" type="password" name="password" />
				  </div>
			  </div>

			  <div className="col-md-1 col-md-offset-4 col-xs-2">
				  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
					Login
				  </button>
			  </div>

				<div className="col-md-3 col-xs-3">
					<button className="btn btn-primary" onClick={() => onLoginAsGuest()} type="button">
					Login as Guest
					</button>
				</div>

			</Form>
		  )}
		</Formik>
	  </div>
    )

}