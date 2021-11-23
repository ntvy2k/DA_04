import React, { useState, memo } from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
})

interface addText {
    onSubmit: Function
    id: number
    value: string
}

function AddText(props: addText) {
    const { id, onSubmit, value } = props
    const type = 'text'
    const [currentValue, setCurrentValue] = useState<string>(value)
    function handleChange(content: string) {
        setCurrentValue(content)
    }
    return (
        <div>
            <SunEditor
                setContents={currentValue}
                onChange={handleChange}
                onBlur={onSubmit({ id, value: currentValue, type })}
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
                height='100%'
            />
        </div>
    );
}

export default memo(AddText);