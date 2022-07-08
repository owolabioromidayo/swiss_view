import { IconButton, Flex, Image, Heading, Text } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
// import UserProfile from "./UserProfile";

export default function Header({ onOpen, ...rest }) {
  const monthwords = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthshort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const daywords = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let newDate = new Date();
  let day = daywords[newDate.getDay()];
  let date = newDate.getDate();
  let month = monthwords[newDate.getMonth()];
  let shorts = monthshort[newDate.getMonth()];
  let year = newDate.getFullYear();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px="4"
      position="sticky"
      top="0"
      height="20"
      zIndex="1"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justify="space-between"
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

        <Image
          display={{ base: "flex", md: "none" }}
          src="/swislogo.png"
          alt="swis_logo"
          w={20}
        />

      <Flex align='center' direction="column" justify='start' display={{ base: "none", md: "flex" }}>
      <Heading>
       {month}  {year}
      </Heading>

      <Text>
        {day}, {date} {shorts}, {year}
      </Text>
      </Flex>

      {/* <UserProfile /> */}
    </Flex>
  );
}
