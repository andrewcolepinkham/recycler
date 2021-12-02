import React, { Fragment } from 'react';
import Form from './Form';
import Submissions from './submissions';

export default function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Submissions />
    </Fragment>
  );
}