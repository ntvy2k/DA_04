import Editor from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { valuePlayGround } from '../../../pages/addContent';

interface addPlayGround {
    id: number,
    button: boolean,
    onSubmit: Function
}

export function AddPlayGround(props: addPlayGround) {
    const { id, button, onSubmit } = props
    const editorRef = useRef<any>(null)
    const [language, setLanguage] = useState<string>("javascript")
    const [addrLanguage, setAddrLanguage] = useState<Array<string>>(["javascript", "java", "python"])
    const [value, setValue] = useState<string>('')
    const Add = addrLanguage.map(Add => Add)
    const handleAddrTypeChange = (e: any) => setLanguage(e.target.value)

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
        // editor.onDidBlurEditorWidget(() => {

        //     console.log(value)
        //     // onSubmit({ id, value, language, button })

        // })
    }


    function showValue() {
        setValue(editorRef.current?.getValue())
        onSubmit({ id, value, language, button })
    }

    return (

        <div>
            < select
                onChange={e => handleAddrTypeChange(e)}
                className="browser-default custom-select" >
                {
                    Add.map((address, key) => <option key={key} value={address}>{address}</option>)
                }
            </select >
            <Editor
                height="90vh"
                defaultLanguage={language}
                defaultValue="// some comment"
                onMount={handleEditorDidMount}
                onChange={showValue}
            />
        </div>
    );
}