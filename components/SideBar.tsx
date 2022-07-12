import { useEffect } from "react";
import { useRouter } from "next/router";

import { Box, CloseButton, Flex, Text, Image } from "@chakra-ui/react";

import {
  FiHome,
  FiMap,
  FiCalendar,
  FiSettings,
} from "react-icons/fi";
import { IoBarChartOutline } from "react-icons/io5"

import NavLink from "./NavLink";

const LinkItems = [
  { label: "Dashboard", icon: FiHome, href: "/" },
  { label: "Maps", icon: FiMap, href: "/maps" },
  { label: "Graphs", icon: IoBarChartOutline, href: "/graphs" },
  { label: "Settings", icon: FiSettings, href: "/settings" },
];

export default function Sidebar({ onClose, ...rest }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", onClose);
    return () => {
      router.events.off("routeChangeComplete", onClose);
    };
  }, [router.events, onClose]);

  return (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", lg: 44 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center"  justifyContent="space-between" bg="#000A16">
        <Flex mx={3} align='center'>
        <Image src="/swislogo.png" alt="swis_logo" w={40}/>
        </Flex>
        <CloseButton display={{ base: "flex", lg: "none" }} onClick={onClose} color='white' />
      </Flex>
      {LinkItems.map((link, i) => (
        <NavLink key={i} link={link} />
      ))}
    </Box>
  );
}