import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from "next/dynamic";
import SunEditor, { buttonList } from "suneditor-react";
import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css';

TextEditTor.propTypes = {

};

function TextEditTor() {
    const [value, setValue] = useState<string>();

    return (
        <div>
            <SunEditor
                setContents={value}
                onChange={setValue}
                setOptions={{
                    buttonList: [
                        ["undo", "redo"],
                        ["font", "fontSize"],
                        // ['paragraphStyle', 'blockquote'],
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
                        // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                        // ['imageGallery'], // You must add the "imageGalleryUrl".
                        // ["fullScreen", "showBlocks", "codeView"],
                        ["preview", "print"],
                        ["removeFormat"]

                        // ['save', 'template'],
                        // '/', Line break
                    ],
                    defaultTag: "div",
                    minHeight: "300px",
                    showPathLabel: false,
                }}
            />
        </div>
    );
}

export default TextEditTor;