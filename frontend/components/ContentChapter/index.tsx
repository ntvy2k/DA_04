import React from 'react';
import PropTypes from 'prop-types';

export interface ContentProps {
    id: number
}

function ContentChapter(props: ContentProps) {
    const { id } = props
    return (
        <div>
            <p>This is chapter {id} </p>
        </div>
    );
}

export default ContentChapter;