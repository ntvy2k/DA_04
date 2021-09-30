import React from 'react';
import PropTypes from 'prop-types';

ContentChapter.propTypes = {
    id: PropTypes.number.isRequired
};

ContentChapter.defaultProps = {
    id: 0
}

function ContentChapter(props: any) {
    const { id } = props
    return (
        <div>
            <p>This is chapter {id} </p>
        </div>
    );
}

export default ContentChapter;