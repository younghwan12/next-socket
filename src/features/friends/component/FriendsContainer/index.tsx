import Image from "next/image"
import React from "react"

const FriendsContainer = () => {
  const myInfo = {
    data: {
      background_img_url: "",
      id: 1,
      name: "잉영황",
      profile_img_url: "015_cateImg_brand.jpg",
      user_id: "test01",
    },
    msg: "이미 사용중이거나 탈퇴한 아이디입니다.",
  }

  const friendsList = {
    data: [
      {
        background_img_url: "",
        id: 2,
        name: "abc",
        profile_img_url: "015_cateImg_brand.jpg",
        user_id: "test02",
      },
    ],
    msg: "친구 목록 불러옴",
  }

  return (
    <div>
      <div className="Content__MyProfileBlock-sc-1kxbcx9-0 jpHEYn">
        <Image width={50} height={50} src={`/images/${myInfo.data.profile_img_url}`} alt="profile"></Image>
        <p>
          <b>{myInfo.data.name}</b>
        </p>
      </div>
    </div>
  )
}

export default FriendsContainer
