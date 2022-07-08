import NextLink from "next/link";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NavLink({ link, ...rest }) {
  const { label, icon, href } = link;
  const router = useRouter();

  return (
    <NextLink href={href} passHref>
      <a>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            color: "#2B6CB0",
          }}
          color={router.pathname === href ? "#2B6CB0" : "gray.400"}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "#2B6CB0",
              }}
              color={router.pathname === href ? "#2B6CB0" : "gray.400"}
              as={icon}
            />
          )}
          <Text fontSize="1.2rem">{label}</Text>
        </Flex>
      </a>
    </NextLink>
  );
}