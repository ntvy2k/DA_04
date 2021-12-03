import React from 'react';
import { ContentList } from '../../moduleType';
import "suneditor/dist/css/suneditor.min.css";
import dynamic from 'next/dynamic';
import PHP from '../RunCode/PHP';
import JavaScipt from '../RunCode/JavaScript';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
})


export interface ContentProps {
    data: Array<ContentList | null>
}

function ContentChapter(props: ContentProps) {
    const { data } = props
    return (
        <div>
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