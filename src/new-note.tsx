import { default as React } from "react";
import { Formik, Form, Field } from "formik";
import "./new-note.css";
import Note from "./note";
import { NoteDetails } from "./note-details";
import User from "./user";

interface Props {
  onSubmit(note: Note): void;
}

export const NewNote = ({ onSubmit }: Props) => {
  return (
    <div>
      <Formik
        initialValues={{ title: "", note: "" }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <NoteDetails />
            <button
              className="btn btn-primary2"
              type="submit"
              disabled={isSubmitting}
            >
              Create note
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
