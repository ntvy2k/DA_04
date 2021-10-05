import React, { useState } from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
})

interface addText {
    onSubmit: Function
    id: number
}

export function AddText(props: addText) {
    const { id, onSubmit } = props
    const type = 'text'
    const [content, setContent] = useState<any>('');
    function handleChange(content: string) {
        setContent(content)
    }

    return (
        <div>
            <SunEditor
                setContents={content}
                onChange={setContent}
                onBlur={onSubmit({ id, content, type })}
                setOptions={{
                    buttonList: [
                        ["undo", "redo"],
                        ["font", "fontSize"],
                        ['paragraphStyle', 'blockquote'],
                        [
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "subscript",
                            "superscript"
                        ],
                        ["fontColor", "hiliteColor"],
                        ["align", "list", "lineHeight"],
                        ["outdent", "indent"],

                        ["table", "horizontalRule", "link", "image", "video"],
                        // ['math'], //You must add the 'katex' library at options to use the 'math' plugin.
                        // ['imageGallery'], // You must add the "imageGalleryUrl".
                        ["fullScreen", "showBlocks", "codeView"],
                        ["preview", "print"],
                        ["removeFormat"]

                        // ['save', 'template'],
                        // ['/'],// Line break
                    ],
                    defaultTag: "div",
                    minHeight: "300px",
                    showPathLabel: false,
                }}
            />
        </div>
    );
}