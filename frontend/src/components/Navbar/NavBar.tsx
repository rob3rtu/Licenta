import { Flex, Text, Avatar, Divider } from "@chakra-ui/react";
import { colors } from "../../theme";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { CourseTabs } from "./CourseTabs";
import { NavTabs } from "./NavTabs";

interface NavBarProps {
  courseName?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ courseName }) => {
  const user = useSelector((state: RootState) => state.auth.account);
  const nav = useNavigate();

  return (
    <Flex
      position="sticky"
      top={0}
      zIndex={999}
      bg={colors.darkerGrey}
      height="17vh"
      width="100vw"
      borderRadius="0 0 30px 30px"
      direction="column"
      alignItems="center"
      padding={5}
    >
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding="0 20px 15px 20px"
        width="100%"
      >
        <Text
          fontFamily="WorkSans-BoldItalic"
          color={colors.white}
          fontSize={25}
          onClick={() => {
            nav("/");
          }}
          cursor={"pointer"}
        >
          LEARNIFY
        </Text>
        <Avatar
          src={user?.profileImage ?? undefined}
          fontFamily="WorkSans-Regular"
          cursor="pointer"
          name={user?.fullName ?? user?.email.split("@")[0]}
          size="md"
          bg={colors.blue}
          onClick={() => {
            nav("/profile");
          }}
        ></Avatar>
      </Flex>

      <Divider width="100%" padding="0 20px 0 20px" opacity={0.2} />

      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        padding="15px 20px 5px 20px"
      >
        {courseName ? (
          <>
            <Text
              fontFamily="WorkSans-BoldItalic"
              color={colors.white}
              fontSize={15}
            >
              {courseName}
            </Text>
            <CourseTabs />
          </>
        ) : (
          <>
            <NavTabs type="domain" />
            <NavTabs type="year" />
            <NavTabs type="semester" />
          </>
        )}
      </Flex>
    </Flex>
  );
};