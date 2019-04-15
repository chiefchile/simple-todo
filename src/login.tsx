import { default as React } from "react";
import { Formik, Form, Field } from "formik";
import { Message } from "./message";
import User from "./user";
import Result from "./result";
import { Logo } from "./logo";

interface Props {
  onSubmit(user: User): void;
  onLoginAsGuest(): void;
  loginResult: Result | null;
}

export const Login = ({ onSubmit, onLoginAsGuest, loginResult }: Props) => {
  return (
    <div className="container login-container">
      <div className="row">
        <div className="login col-sm-3 col-centered">
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <Logo isCenter={true} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <Message result={loginResult} />
            </div>
          </div>

          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values: User, { setSubmitting }) => {
              setSubmitting(false);
              onSubmit(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form-horizontal">
                <div className="form-group">
                  <div className="col-md-10 col-md-offset-1">
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
                  <div className="col-md-10 col-md-offset-1">
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
                  <div className="col-md-10 col-md-offset-1">
                    <button
                      id="button-login"
                      className="btn btn-primary2"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                    <button
                      className="btn btn-default btn-adjacent"
                      onClick={() => onLoginAsGuest()}
                      type="button"
                    >
                      Guest Login
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
