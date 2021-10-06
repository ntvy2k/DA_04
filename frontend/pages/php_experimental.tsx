import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React from "react";
import axios, { AxiosResponse } from "axios";

type CodeResponse = {
  out: string;
  err: string;
  time: string;
};

const run_code = async (code: string) => {
  const url = "/php/run";
  const response: AxiosResponse<CodeResponse> = await axios.post(url, {
    code: code,
  });
  const data = response.data;
  return data;
};

const PHP = () => {
  const [code, set_code] = React.useState<string>("<?php");
  const [output, set_output] = React.useState<string>("");
  const [error, set_error] = React.useState<string>("");
  const [time, set_time] = React.useState<string>("");

  const handleChange = (
    value: string | undefined,
    e: editor.IModelContentChangedEvent
  ) => {
    if (value !== undefined) {
      set_code(value);
    }
  };

  const handleClick = () => {
    run_code(code)
      .then((data) => {
        set_output(data.out);
        set_error(data.err);
        set_time(data.time);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Editor
        height="30vh"
        theme="vs-dark"
        defaultLanguage="php"
        defaultValue={code}
        onChange={(value, e) => handleChange(value, e)}
      />
      <button type="button" onClick={handleClick}>
        Run
      </button>
      <p></p>
      {output === "" ? "" : <p>{output}</p>}
      {error === "" ? "" : <p>{error}</p>}
      <p>{time}</p>
    </>
  );
};

export default PHP;
