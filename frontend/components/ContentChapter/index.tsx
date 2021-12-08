import React, { useState } from 'react';
import { ContentList } from '../../moduleType';
import "suneditor/dist/css/suneditor.min.css";
import dynamic from 'next/dynamic';
import PHP from '../RunCode/PHP';
import JavaScipt from '../RunCode/JavaScript';
import Java from '../RunCode/Java';
import Python from '../RunCode/Python';
import { Form } from 'react-bootstrap';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
})


export interface ContentProps {
    data: Array<ContentList | null>
}

function ContentChapter(props: ContentProps) {
    const { data } = props
    const [theme, setTheme] = useState<boolean>(false)
    return (
        <div>
            {
                data.length > 0 && <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Dark mode code"
                    className='ms-auto'
                    onChange={() => setTheme(!theme)}
                    checked={theme}
                />
            }
            {data.map((content) => {
                switch (content?.content.type) {
                    case 'text': {
                        return (<SunEditor
                            key={content.id}
                            setContents={content.content.value}
                            hideToolbar={true}
                            disable={true}
                            height="100%"
                        />)
                    }
                    case 'playground': {
                        switch (content?.content.language) {
                            case 'css':
                            case 'javascript':
                            case 'html': {
                                return (
                                    <div key={content.id}>
                                        <JavaScipt
                                            value={content.content.value}
                                            button={content.content.button}
                                            theme={theme}
                                        />
                                    </div>
                                )
                            }
                            case 'php': {
                                return (
                                    <div key={content.id}>
                                        <PHP
                                            value={content.content.value}
                                            button={content.content.button}
                                            theme={theme}
                                        />
                                    </div>
                                )
                            }
                            case 'java': {
                                return (
                                    <div key={content.id}>
                                        <Java
                                            value={content.content.value}
                                            button={content.content.button}
                                            theme={theme}
                                        />
                                    </div>
                                )
                            }
                            case 'python': {
                                return (
                                    <div key={content.id}>
                                        <Python
                                            value={content.content.value}
                                            button={content.content.button}
                                            theme={theme}
                                        />
                                    </div>
                                )
                            }
                        }
                    }
                }
            })}
        </div>
    );
}

export default ContentChapter;