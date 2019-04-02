import React from "react";
import { default as Todo, API_HOST } from "./todo";
import {
  render,
  fireEvent,
  cleanup,
  wait,
  within,
  waitForElement
} from "react-testing-library";
import axios from "axios";
import Note from "./note";

let todo: any = null;
const user = "testuser";

beforeEach(done => {
  axios
    .delete(`${API_HOST}/note/deleteByUser/${user}`)
    .then(res => {
      done();
    })
    .catch(function(error) {
      //console.log(error);
      throw error;
    });
});

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("should create a note", async () => {
  const resultMsg = "Note created";
  todo = render(<Todo user={user} />);
  const note: Note = { title: "Title1", note: "Note1", user: user };
  await createNote(note);
  await viewNote(note, resultMsg);
});

const createNote = async (note: Note) => {
  const { getByText, getByLabelText } = todo;
  fireEvent.click(getByText("New Note", { selector: "button" }));
  await waitForElement(() => getByText("New Note", { selector: "h3" }));
  fireEvent.change(getByLabelText("Title:"), { target: { value: note.title } });
  fireEvent.change(getByLabelText("Note:"), { target: { value: note.note } });
  fireEvent.click(getByText("Create note"));
};

const viewNote = async (note: Note, resultMsg: string) => {
  const { getByText, getByLabelText, getByDisplayValue } = todo;
  await waitForElement(() => getByDisplayValue(note.title));
  const inputTitle = getByLabelText("Title:");
  expect(inputTitle.value).toBe(note.title);
  const textAreaNote = getByLabelText("Note:");
  console.log(note);
  expect(textAreaNote.value).toBe(note.note);
  await waitForElement(() => getByText(resultMsg));
};

it("should update a note", async () => {
  todo = render(<Todo user={user} />);

  const oldNote: Note = { title: "Old Title", note: "old note", user: user };
  const newNote: Note = { title: "New Title", note: "new note", user: user };
  await createNote(oldNote);
  await viewNote(oldNote, "Note created");
  updateNote(newNote);
  await viewNote(newNote, "Note updated");
});

const updateNote = (newNote: Note) => {
  const { getByText, getByLabelText } = todo;
  fireEvent.change(getByLabelText("Title:"), {
    target: { value: newNote.title }
  });
  fireEvent.change(getByLabelText("Note:"), {
    target: { value: newNote.note }
  });
  fireEvent.click(getByText("Update note"));
};

it("should delete a note", async () => {
  todo = render(<Todo user={user} />);

  const note: Note = {
    title: "Title to be deleted",
    note: "delete this",
    user: user
  };
  await createNote(note);
  await viewNote(note, "Note created");
  await deleteNote();
});

const deleteNote = async () => {
  const { queryByText, getByText } = todo;
  fireEvent.click(getByText("Delete note"));
  await wait(() => {
    const deletedTitle = queryByText("Title to be deleted", { selector: "a" });
    expect(deletedTitle).toBeFalsy();
  });
};
