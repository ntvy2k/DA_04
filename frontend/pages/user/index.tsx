import React from 'react';
import HomeLayout from '../../components/Layouts/homeLayout';
import UserLayout from '../../components/Layouts/userLayout';
import UserImages from '../../public/User.json'
import Lottie from 'react-lottie';

function User() {
    const UserOptions = {
        loop: true,
        autoplay: true,
        animationData: UserImages,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <HomeLayout>
            <UserLayout>
                <div>
                    <h1 className='text-center'>Chọn cái gì đó ở bên trái đê bro</h1>
                    <Lottie options={UserOptions} height={400} width={400}></Lottie>
                </div>
            </UserLayout>
        </HomeLayout>
    );
}

export default User;