import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

Course.propTypes = {

};

function Course() {
    const router = useRouter()
    const { course } = router.query
    console.log(course);
    return (
        <div>
            <p>This is course: {course}</p>
        </div>
    );
}

export default Course;