import { default as React } from 'react';
import { Formik, Form, Field } from 'formik';
import { Message } from './message';
import User from './user';
import Result from './result';

export const Login = ({ onSubmit, onLoginAsGuest, loginResult }: 
	{
		onSubmit(user: User): void, 
		onLoginAsGuest(): void, 
		loginResult: Result | null
	}) => {

	return (
		<div className="container">
			<div className="row">
				<div id="logo-text" className="col-md-2 col-md-offset-5"><h2>// TODO:</h2></div>
			</div>

			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<Message result={loginResult} />
				</div>
			</div>

			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					onSubmit(values);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="form-horizontal">
						<div className="form-group">
							<label className="col-md-1 col-md-offset-4 control-label">Username: </label>
							<div className="col-md-3">
								<Field className="form-control" id="username" type="text" name="username" />
							</div>
						</div>

						<div className="form-group">
							<label className="col-md-1 col-md-offset-4 control-label">Password: </label>
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