import React from "react";
import { default as Todo, API_HOST } from "../todo";
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
  screen,
  act,
  within,
  waitForElementToBeRemoved,
  configure,
} from "@testing-library/react";
import axios from "axios";
import Note from "../note";
import User from "../user";

const user = "testuser";
let authToken: string = "";
let axiosConfig: any = null;

configure({ asyncUtilTimeout: 2000 });

beforeAll((done) => {
  let testuser: User = { username: "testuser", password: "testuser" };
  axios
    .post(`${API_HOST}/api-token-auth/`, testuser)
    .then((res) => {
      authToken = res.data.token;
      axiosConfig = { headers: { Authorization: `Token ${authToken}` } };
      return axios.get(`${API_HOST}/note/deleteTestData/`);
    })
    .then((res) => {
      done();
    })
    .catch((error) => {
      console.error(error);
    });
});

// beforeEach((done) => {});

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

test("should create a note", async () => {
  const resultMsg = "Note created";
  const todo = render(<Todo authToken={authToken} />);
  const note: Note = {
    title: "create test title",
    note: "create test note",
    user: user,
  };
  await createNote(todo, note);
  await checkTitles(note.title);
  await viewNote(todo, note, resultMsg);
});

const createNote = async (todo: any, note: Note) => {
  const { getByText, getByLabelText } = todo;
  fireEvent.click(getByText("New Note", { selector: "button" }));
  await waitFor(() => getByText("Create note"));
  fireEvent.change(getByLabelText("Title"), { target: { value: note.title } });
  fireEvent.change(getByLabelText("Note"), { target: { value: note.note } });
  fireEvent.click(getByText("Create note"));
};

const viewNote = async (todo: any, note: Note, resultMsg: string) => {
  const { getByText, getByLabelText, getByDisplayValue } = todo;
  await waitFor(() => getByDisplayValue(note.title));
  const inputTitle = getByLabelText("Title");
  expect(inputTitle.value).toBe(note.title);
  const textAreaNote = getByLabelText("Note");
  // console.log(note);
  expect(textAreaNote.value).toBe(note.note);
  await waitFor(() => getByText(resultMsg));
};

test("should update a note", async () => {
  const todo = render(<Todo authToken={authToken} />);

  const oldNote: Note = { title: "Old Title", note: "old note", user: user };
  const newNote: Note = { title: "New Title", note: "new note", user: user };
  await createNote(todo, oldNote);
  await checkTitles(oldNote.title);
  await viewNote(todo, oldNote, "Note created");
  updateNote(todo, newNote);
  await viewNote(todo, newNote, "Note updated");
  await checkTitles(newNote.title);
});

const updateNote = (todo: any, newNote: Note) => {
  const { getByText, getByLabelText } = todo;
  fireEvent.change(getByLabelText("Title"), {
    target: { value: newNote.title },
  });
  fireEvent.change(getByLabelText("Note"), {
    target: { value: newNote.note },
  });
  fireEvent.click(getByText("Update note"));
};

it("should delete a note", async () => {
  const todo = render(<Todo authToken={authToken} />);

  const note: Note = {
    title: "Title to be deleted",
    note: "delete this",
    user: user,
  };
  await createNote(todo, note);
  await checkTitles(note.title);
  await viewNote(todo, note, "Note created");
  await deleteNote(todo, note);
});

const deleteNote = async (todo: any, note: Note) => {
  window.confirm = jest.fn(() => true); // always click 'OK'
  const { queryByText, getByText } = todo;
  fireEvent.click(getByText("Delete note"));
  const todoList = document.getElementById("todo-list")!;
  await waitForElementToBeRemoved(() =>
    within(todoList).queryByText(note.title)
  );
};

it("refresh", async () => {
  const todo = render(<Todo authToken={authToken} />);
  const note: Note = {
    title: "title to be refreshed",
    note: "refresh test note",
    user: user,
  };

  await act(async () => {
    let createdNote = await createNoteThruApi(note);
    const updatedNote: Note = { ...createdNote, title: "updated title" };
    await updateNoteThruApi(updatedNote);
    await refresh(todo, updatedNote);
  });
});

const refresh = async (todo: any, updatedNote: Note) => {
  const { getByText, findByText } = todo;
  fireEvent.click(getByText("Refresh"));
  await checkTitles(updatedNote.title);
};

const updateNoteThruApi = async (note: Note) => {
  await axios.put(`${API_HOST}/note/${note._id}/`, note, axiosConfig);
};

const createNoteThruApi = async (note: Note): Promise<Note> => {
  let res = await axios.post(`${API_HOST}/note/`, note, axiosConfig);
  return res.data;
};

async function checkTitles(title: string) {
  const todoList = document.getElementById("todo-list")!;
  await within(todoList).findByText(title);
}
