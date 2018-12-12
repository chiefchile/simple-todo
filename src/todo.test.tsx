import React from 'react';
import {default as Todo, API_HOST} from './todo';
import {render, fireEvent, cleanup, wait, within} from 'react-testing-library'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

it('should display all note titles', async () => {
  var mock = new MockAdapter(axios);
  mock.onGet().reply(200, {
    titles: [
      { _id: 1, title: 'Title1' }
    ]
  });
  const { getByText } = render(
    <Todo user="alex" />,
  )
  
  await wait(() => getByText('Title1'));
});