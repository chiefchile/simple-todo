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
    <div className="container-fluid">
      <div className="row">
        <div className="login col-sm-3 col-sm-offset-4">
          <div className="row">
            <div className="col-xs-6 col-xs-offset-3">
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
                  <div className="col-md-3 col-md-offset-1 col-xs-2">
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
      </div>
    </div>
  );
};
