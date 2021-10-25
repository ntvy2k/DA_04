import Editor from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import styles from '../../../styles/AddPlayGround.module.css'

interface addPlayGround {
    id: number,
    button: boolean,
    onSubmit: Function,
}

export function AddPlayGround(props: addPlayGround) {
    const { id, onSubmit } = props
    const editorRef = useRef<any>(null)
    const type = 'playground'

    const [language, setLanguage] = useState<string>("javascript")
    const [addrLanguage, setAddrLanguage] = useState<Array<string>>(["javascript", "java", "python"])

    const [value, setValue] = useState<string>('')

    const [button, setButton] = useState<boolean>(false)

    const Add = addrLanguage.map(Add => Add)
    const handleAddrTypeChange = (e: any) => setLanguage(e.target.value)

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
        // editor.onDidBlurEditorWidget(() => {

        //     // console.log(value)
        //     // onSubmit({ id, value, language, button })

        // })
    }


    function handleBlur() {
        editorRef.current.onDidBlurEditorWidget(() => {
            onSubmit({ id, value, language, button, type })
        })
    }


    function showValue() {
        setValue(editorRef.current?.getValue())
    }

    return (

        <div onBlur={handleBlur} >
            <div className='d-flex align-items-center'>
                <select
                    onChange={e => handleAddrTypeChange(e)}
                    className={styles.select} >
                    {
                        Add.map((address, key) => <option key={key} value={address}>{address}</option>)
                    }
                </select >
                <div className={styles.button}>
                    <label htmlFor="buttonRun">Add button run code ?</label>
                    <input className='ms-2' type="checkbox" id="buttonRun" onChange={() => setButton(!button)} />
                </div>
            </div>
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