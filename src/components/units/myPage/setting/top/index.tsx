import { useState } from "react";
import { useUser } from "../../../../commons/hooks/custom/useUser";
import AvatarUpload from "../../../../commons/parts/avatarUpload";
import * as S from "./styles";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import InputHeight50px from "../../../../commons/inputs/InputHeight50px";
import TextArea from "../../../../commons/inputs/TextArea";
import { useQueryFetchLoginUser } from "../../../../commons/hooks/queries/useQueryFetchLoginUser";
import { useSettings } from "../../../../commons/hooks/custom/useSettings";

export default function SettingsTop() {
  const { data } = useQueryFetchLoginUser();
  const {
    isAvatarEdit,
    isProfileEdit,
    onClickEditAvatar,
    onClickEditProfile,
    fileList,
    setFileList,
    onClickSubmitAvatar,
    onClickDeleteAvatar
  } = useSettings();

  return (
    <S.Wrapper>
      <S.SettingTop>
        <S.Container>
          <S.AvatarWrap>
            {isAvatarEdit && (
              <AvatarUpload fileList={fileList} setFileList={setFileList} />
            )}
            {!isAvatarEdit && (
              <Avatar
                size={130}
                icon={<UserOutlined />}
                src={data?.fetchLoginUser?.user_profileImage}
              />
            )}
            <S.AvatarEdit
              onClick={isAvatarEdit ? onClickSubmitAvatar : onClickEditAvatar}
            >
              {isAvatarEdit ? "수정 완료하기" : "이미지 수정"}
            </S.AvatarEdit>
            <S.AvatarRemove
              onClick={isAvatarEdit ? onClickEditAvatar : onClickDeleteAvatar}
            >
              {isAvatarEdit ? "취소하기" : "이미지 제거"}
            </S.AvatarRemove>
          </S.AvatarWrap>
          <S.ProfileWrap>
            {isProfileEdit ? (
              <S.Form>
                <S.ProfileBox>
                  <InputHeight50px
                    placeholder="닉네임을 입력해주세요."
                    defaultValue={data?.fetchLoginUser?.user_nickname}
                  />
                  <S.Text
                    placeholder="자기소개를 입력해주세요."
                    defaultValue={
                      data?.fetchLoginUser?.user_introduce !== ""
                        ? data?.fetchLoginUser?.user_introduce
                        : "자기소개를 입력해주세요."
                    }
                  ></S.Text>
                </S.ProfileBox>
                <S.ProfileEditBtn>
                  <S.ProfileEdit onClick={onClickEditProfile}>
                    수정 완료하기
                  </S.ProfileEdit>
                </S.ProfileEditBtn>
              </S.Form>
            ) : (
              <>
                <S.ProfileBox>
                  <S.ProfileNickname>
                    {data?.fetchLoginUser?.user_nickname ?? "유저 닉네임"}
                  </S.ProfileNickname>
                  <S.ProfileIntroduce>
                    {data?.fetchLoginUser?.user_introduce !== ""
                      ? data?.fetchLoginUser?.user_introduce
                      : "자기소개를 입력해주세요."}
                  </S.ProfileIntroduce>
                </S.ProfileBox>
                <S.ProfileEditBtn>
                  <S.ProfileEdit onClick={onClickEditProfile}>
                    프로필 수정하기
                  </S.ProfileEdit>
                </S.ProfileEditBtn>
              </>
            )}
          </S.ProfileWrap>
        </S.Container>
      </S.SettingTop>
    </S.Wrapper>
  );
}
