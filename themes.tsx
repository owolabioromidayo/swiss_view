import { extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat";

const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '1190px',
    xl: '1200px',
    '2xl': '1536px',
  }
const theme = extendTheme({
        fonts: {
        heading: 'Montserrat',
        body: 'Montserrat',       
    },
    breakpoints,
    components: {
        Button: { baseStyle: {_focus: { boxShadow: 'none'}}}       
    },   
    
})

export default theme