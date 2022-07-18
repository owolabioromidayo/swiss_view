import Header from "./Header";
import SideBar from "./SideBar";

import { Box, Center, Drawer, DrawerContent, useDisclosure, Flex } from "@chakra-ui/react";

export default function Layout({ children, page, setPage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center>
    <Box minH="100vh" minW='full' >
      <SideBar
        onClose={() => onClose}
        display={{ base: "none", lg: "block" }}
        page={page}
        setPage={setPage}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
        <SideBar onClose={onClose} 
          page={page}
          setPage={setPage}
         />
        </DrawerContent>
      </Drawer>

      {/*= Header =*/}
      <Header onOpen={onOpen} />
      
      <Flex ml={{ base: 0, md: 0, lg: 44 }} justify='center'>
        {children}
      </Flex>
    </Box>
    </Center>
  );
}