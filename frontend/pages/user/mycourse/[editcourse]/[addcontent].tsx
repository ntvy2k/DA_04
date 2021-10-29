import React from 'react';
import AddContent from '../../../../components/Content/AddContent';
import HomeLayout from '../../../../components/Layouts/homeLayout';

function AddContentPage() {

    return (
        <HomeLayout>
            <div className='container'>
                <AddContent></AddContent>
            </div>
        </HomeLayout>
    );
}

export default AddContentPage;