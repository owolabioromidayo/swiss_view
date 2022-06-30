import{Flex, useBreakpointValue} from "@chakra-ui/react"

export default function WelcomeScreen(){
    const fontSize = useBreakpointValue({sm:"30px", md:"50px"})
    return (
        <Flex textAlign="center" h="100vh" w="100%" py="40% 40%" position="relative">
            <h1 style={{
                position: "absolute",
                top: "50%",
                left: "40%",
                fontWeight:"bold",
                fontSize: fontSize
            }}>
                Loading...
            </h1>
        </Flex>
    ) 
}