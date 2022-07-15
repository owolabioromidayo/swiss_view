import{Flex, useBreakpointValue, Image, Center} from "@chakra-ui/react"
import styles from "../styles/welcome.module.css"

export default function WelcomeScreen(){
    const fontSize = useBreakpointValue({sm:"30px", md:"50px"})
    return (
        <Flex textAlign="center" h="100vh" w="100%" py="40% 40%" position="relative">
            {/* <h1 style={{
                position: "absolute",
                top: "50%",
                left: "40%",
                fontWeight:"bold",
                fontSize: fontSize
            }}>
                Loading...
            </h1> */}
            <Center w="100%" h="100%">
                <Image 
                src="/swisicon.png"
                w={40} 
                h={40} 
                
                className={styles.rotate}
                style = {{
                  
                }}/>

            </Center>
        </Flex>
    ) 
}