import React, { useState } from 'react';
import { AddPlayGround, AddText } from '../../components/Content';

export interface valuePlayGround {
    value: String,
    language: String,
    button: boolean
}

interface dataContent {
    id: number,
    value: String | valuePlayGround,
}


function AddContent() {
    const [content, setContent] = useState<Array<JSX.Element>>([])
    const [numChild, setNumChild] = useState<any>(0)
    // const [submitContent, setSubmitContent] = useState<>()
    const handleSubmit = (value: dataContent) => {
        console.log('form submit:', value)
    }
    function handleClick(type: 'text' | 'playGroundWithRunCode' | 'playGroundWithoutRunCode') {
        switch (type) {
            case 'text': {
                setContent([...content,
                <AddText key={numChild} id={numChild} onSubmit={handleSubmit} />])
                break
            }
            case 'playGroundWithRunCode': {
                setContent([...content,
                <AddPlayGround
                    key={numChild}
                    id={numChild}
                    button={true}
                    onSubmit={handleSubmit}
                />])
                break
            }
            case 'playGroundWithoutRunCode': {
                setContent([...content,
                <AddPlayGround
                    key={numChild}
                    id={numChild}
                    button={false}
                    onSubmit={handleSubmit}
                />])
                break
            }
        }
        setNumChild(numChild + 1)
    }

    return (
        <div>
            <button onClick={() => handleClick('text')}>Add text</button>
            <button onClick={() => handleClick('playGroundWithRunCode')}> Add PlayGround</button>
            <button onClick={() => handleClick('playGroundWithoutRunCode')}> Add PlayGround</button>
            {content}
        </div >
    );
}
export default AddContent