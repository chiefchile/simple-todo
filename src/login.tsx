import { default as React } from "react";
import { Formik, Form, Field } from "formik";
import { Message } from "./message";
import User from "./user";
import Result from "./result";

interface Props {
  onSubmit(user: User): void;
  onLoginAsGuest(): void;
  loginResult: Result | null;
}

export const Login = ({ onSubmit, onLoginAsGuest, loginResult }: Props) => {
  return (
    <div className="login col-md-4 col-md-offset-4">
      <div className="row">
        <h1 id="logo-text" className="col-md-6 col-md-offset-3">
          // TODO
        </h1>
      </div>

      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <Message result={loginResult} />
        </div>
      </div>

      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onSubmit(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form-horizontal">
            <div className="form-group">
              <div className="col-md-8 col-md-offset-2">
                <Field
                  className="form-control"
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-8 col-md-offset-2">
                <Field
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-3 col-md-offset-2 col-xs-2">
                <button
                  id="button-login"
                  className="btn btn-primary2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
              <div className="col-md-4 col-xs-3">
                <button
                  className="btn btn-primary2"
                  onClick={() => onLoginAsGuest()}
                  type="button"
                >
                  Login as Guest
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
