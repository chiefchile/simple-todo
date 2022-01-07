import { default as React, Fragment } from "react";
import { Field } from "formik";

export const NoteDetails = () => {
  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor="title">Title</label>

        <Field className="form-control" id="title" type="text" name="title" />
      </div>

      <div className="form-group">
        <label htmlFor="note">Note</label>

        <Field
          className="form-control"
          id="note"
          component="textarea"
          name="note"
        />
      </div>
    </Fragment>
  );
};
