import { default as React } from "react";
import { Formik, Form, Field } from "formik";
import { Message } from "./message";
import Note from "./note";
import Result from "./result";
import { NoteDetails } from "./note-details";

interface Props {
  note: Note;
  onUpdate(note: Note): void;
  onDelete(noteId: string | undefined): void;
  result: Result | null;
}

export const ViewNote = ({ note, onUpdate, onDelete, result }: Props) => {
  console.log(note);

  return (
    <div>
      <h3 className="page-header">View Note</h3>
      <Message result={result} />
      <Formik
        initialValues={{
          title: note.title,
          note: note.note,
          user: note.user,
          _id: note._id
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onUpdate(values);
        }}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form className="form-horizontal">
            <NoteDetails />

            <div className="form-group">
              <div className="col-md-2 col-md-offset-1 col-xs-3">
                <button
                  className="btn btn-primary2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Update note
                </button>
              </div>

              <div className="col-md-2 col-md-offset-0 col-xs-3 col-xs-offset-2">
                <button
                  className="btn btn-primary2"
                  onClick={() => onDelete(note._id)}
                  type="button"
                >
                  Delete note
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
