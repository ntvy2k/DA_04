import Editor from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "../../../styles/AddPlayGround.module.css";

interface addPlayGround {
  id: number;
  currentButton: boolean;
  onSubmit: Function;
  currentValue: any;
  currentLanguage: any;
}

export function AddPlayGround(props: addPlayGround) {
  const { id, onSubmit, currentValue, currentButton, currentLanguage } = props;
  const editorRef = useRef<any>(null);
  const type = "playground";
  const [language, setLanguage] = useState<string>(currentLanguage);
  const [addrLanguage, setAddrLanguage] = useState<Array<string>>([
    "javascript",
    "html",
    "css",
    "php",
    "python",
    "java",
  ]);

  const [value, setValue] = useState<string>("");

  const [button, setButton] = useState<boolean>(currentButton);

  const Add = addrLanguage.map((Add) => Add);
  const handleAddrTypeChange = (e: any) => setLanguage(e.target.value);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    // editor.onDidBlurEditorWidget(() => {

    //     // console.log(value)
    //     // onSubmit({ id, value, language, button })

    // })
  }

  function handleBlur() {
    editorRef.current.onDidBlurEditorWidget(() => {
      onSubmit({ id, value, language, button, type });
    });
    // console.log('blur')
  }

  function showValue() {
    setValue(editorRef.current?.getValue());
  }
  return (
    <div onBlur={handleBlur}>
      <div className="d-flex align-items-center">
        <select
          onChange={(e) => handleAddrTypeChange(e)}
          className={styles.select}
        >
          {Add.map((address, key) => (
            <option key={key} value={address} selected={address == language}>
              {address}
            </option>
          ))}
        </select>
        <div className={styles.button}>
          <label htmlFor="buttonRun">Add button run code ?</label>
          <input
            className="ms-2"
            type="checkbox"
            checked={button}
            id="buttonRun"
            onChange={() => setButton(!button)}
          />
        </div>
      </div>
      <Editor
        height="90vh"
        defaultLanguage={language}
        language={language}
        defaultValue={currentValue}
        onMount={handleEditorDidMount}
        onChange={showValue}
      />
    </div>
  );
}
