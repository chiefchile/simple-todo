import { default as React } from "react";
import { Formik, Form, Field } from "formik";
import "./new-note.css";
import Note from "./note";
import { NoteDetails } from "./note-details";

interface Props {
  onSubmit(note: Note): void;
  user: string;
}

export const NewNote = ({ onSubmit, user }: Props) => {
  return (
    <div>
      <h3 className="page-header">New Note</h3>
      <Formik
        initialValues={{ title: "", note: "", user: user }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onSubmit(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <NoteDetails />
            <div className="form-group">
              <div className="col-md-12">
                <button
                  className="btn btn-primary2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Create note
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
