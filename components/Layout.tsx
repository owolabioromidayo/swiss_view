import Header from "./Header";
import SideBar from "./SideBar";

import { Box, Center, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

export default function Layout({ children, page, setPage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center>
    <Box minH="100vh" w={{ base: 'full', lg: '1440px'}}>
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
      <Box ml={{ base: 0, lg: 60 }} px={20}>
        {children}
      </Box>
    </Box>
    </Center>
  );
}