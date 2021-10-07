import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef } from "react";
import axios, { AxiosResponse } from "axios";
import code_styles from '../../../styles/code.module.css'

type CodeResponse = {
    out: string;
    err: string;
    time: string;
};

interface runPhp {
    value: string,
    button: boolean,
}

const run_code = async (code: string) => {
    const url = "/php/run";
    const response: AxiosResponse<CodeResponse> = await axios.post(url, {
        code: code,
    });
    const data = response.data;
    return data;
};

const PHP = (props: runPhp) => {
    const { value, button } = props
    const editorRef = useRef(null);
    const [code, set_code] = React.useState<string>(value);
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


    function handleEditorDidMount(editor: any, monaco: any) {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
        editor.updateOptions({
            readOnly: !button
        })
    }

    return (
        <>
            <Editor
                height="30vh"
                theme="vs-dark"
                defaultLanguage="php"
                defaultValue={code}
                onChange={(value, e) => handleChange(value, e)}
                onMount={handleEditorDidMount}
            />
            {button ? (
                <div>
                    <button type="button" onClick={handleClick}>
                        Run
                    </button>
                    <p></p>
                    <div className={code_styles.code_container}>
                        {output === "" ? "" : <p>{output}</p>}
                        {error === "" ? "" : <p>{error}</p>}
                    </div>
                    <p>{time}</p>
                </div>
            ) : null}
        </>
    );
};

export default PHP;