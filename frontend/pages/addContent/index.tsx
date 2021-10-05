import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AddPlayGround, AddText } from '../../components/Content';
import { dataContent } from '../../moduleType';


function AddContent() {
    const [content, setContent] = useState<Array<JSX.Element>>([])
    const [numChild, setNumChild] = useState<number>(0)
    const [submitContent, setSubmitContent] = useState<Array<any>>([])
    const [data, setData] = useState<dataContent>()
    const handleOnChangeValue = (value: dataContent) => {
        setData(value)
    }
    const handleCloseComponent = (index: number) => {
        const newContent = [...content]
        newContent.splice(index, 1)
        setContent(newContent)
        submitContent.splice(index, 1)
    }
    useEffect(() => {
        if (data != undefined) {
            const checkValue = submitContent.some((content) => {
                return content.id == data.id
            })
            if (checkValue) {
                submitContent.map(content => {
                    if (content.id === data.id) {
                        content.content = data.value
                    }
                })
            } else {
                setSubmitContent([...submitContent, data])
            }
        }
    }, [data])

    function handleSubmit() {
        // courseApi.postContent(1, submitContent)
        console.log(submitContent)
    }
    function handleClick(type: 'text' | 'playGroundWithRunCode') {
        switch (type) {
            case 'text': {
                setContent([...content,
                <AddText
                    id={numChild}
                    onSubmit={handleOnChangeValue}
                />])
                break
            }
            case 'playGroundWithRunCode': {
                setContent([...content,
                <AddPlayGround
                    id={numChild}
                    button={true}
                    onSubmit={handleOnChangeValue}
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
            {content.map((x, index) => {
                return <div key={index} >
                    <button onClick={() => handleCloseComponent(index)} >Close</button>
                    {x}
                </div>
            }
            )}
            <button onClick={() => handleSubmit()} >Submit</button>
        </div >
    );
}
export default AddContent