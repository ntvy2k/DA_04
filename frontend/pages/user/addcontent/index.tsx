import React from 'react';
import HomeLayout from '../../../components/Layouts/homeLayout';
import AddContent from '../../addContent';
import UserLayout from '../../../components/Layouts/userLayout';

function AddCourse() {
    return (
        <HomeLayout>
            <UserLayout>
                <AddContent></AddContent>
            </UserLayout>
        </HomeLayout>
    );
}

export default AddCourse;