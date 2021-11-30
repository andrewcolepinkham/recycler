import React, { Fragment } from "react";
import Form from "./Form";
import Userdata from "./Userdata";

export default function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Userdata />
    </Fragment>
  );
}