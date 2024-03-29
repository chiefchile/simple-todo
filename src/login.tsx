import { default as React } from "react";
import { Formik, Form, Field } from "formik";
import { Message } from "./message";
import User from "./user";
import { Logo } from "./logo";
import IResult from "./result";

interface Props {
  onSubmit(user: User): void;
  onLoginAsGuest(): void;
  loginResult: IResult | null;
}

export const Login = ({ onSubmit, onLoginAsGuest, loginResult }: Props) => {
  return (
    <div className="container-fluid login-container">
      <div className="row">
        <div className="login col-sm-3 col-centered">
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <Logo isCenter={true} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 col-md-offset-1">
              <Message result={loginResult} isShort={false} />
            </div>
          </div>

          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values: User, { setSubmitting }) => {
              onSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form-horizontal">
                <div className="form-group">
                  <label
                    className="col-xs-3 col-xs-offset-1"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <div className="col-xs-10 col-xs-offset-1">
                    <Field
                      className="form-control"
                      id="username"
                      type="text"
                      name="username"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-xs-3 col-xs-offset-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="col-xs-10 col-xs-offset-1">
                    <Field
                      className="form-control"
                      id="password"
                      type="password"
                      name="password"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-10 col-xs-offset-1">
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
