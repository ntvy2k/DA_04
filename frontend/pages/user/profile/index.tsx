import React from "react";
import Lottie from "react-lottie";
import HomeLayout from "../../../components/Layouts/homeLayout";
import ProfileLayout from "../../../components/Layouts/profileLayout";
import UserLayout from "../../../components/Layouts/userLayout";
import UserImage from "../../../public/User.json";
import Head from "next/head";
import TD4_SETTINGS from "../../../app/config";

function Profile() {
  const userOptions = {
    loop: true,
    autoplay: true,
    animationData: UserImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Head>
        <title>Chỉnh sửa thông tin | {TD4_SETTINGS.title}</title>
      </Head>
      <HomeLayout>
        <UserLayout>
          <ProfileLayout>
            <div className="text-center">
              <h3 className="fs-1">Chọn gì đó bên phải đi</h3>
              <Lottie options={userOptions} height={400} width={400}></Lottie>
            </div>
          </ProfileLayout>
        </UserLayout>
      </HomeLayout>
    </>
  );
}

export default Profile;
