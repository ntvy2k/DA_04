import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AxiosResponse } from 'axios';
import { Chapter } from '../../moduleType/course';
import courseApi from '../../pages/api/courseApi';

ListChapter.propTypes = {
    data: PropTypes.array
};
ListChapter.defaultProps = {
    data: []
}

function ListChapter(props: any) {
    const { data } = props
    console.log(data)
    return (
        <div>
            <ul>
                {/* {data.map(({ name }) => {
                    return <li>
                        {name}
                    </li>
                })} */}
            </ul>
        </div>
    );
}


export default ListChapter;