import React, { Fragment } from "react";
import Form from "./Form";
import Submissions from "./Submissions";

export default function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Submissions />
    </Fragment>
  );
}