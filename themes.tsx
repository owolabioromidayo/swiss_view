import { extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat";


const theme = extendTheme({
        fonts: {
        heading: 'Montserrat',
        body: 'Montserrat',       
    },
    components: {
        Button: { baseStyle: {_focus: { boxShadow: 'none'}}}       
    },   
    
})

export default theme