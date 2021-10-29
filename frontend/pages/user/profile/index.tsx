import React from 'react';
import HomeLayout from '../../../components/Layouts/homeLayout';
import ProfileLayout from '../../../components/Layouts/profileLayout';
import UserLayout from '../../../components/Layouts/userLayout';

function Profile() {
    return (
        <HomeLayout>
            <UserLayout>
                <ProfileLayout>
                    <p></p>
                </ProfileLayout>
            </UserLayout>
        </HomeLayout>
    );
}

export default Profile;