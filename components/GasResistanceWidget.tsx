import { Flex } from "@chakra-ui/react";

export default function GasResistanceWidget({gasResistance} : {gasResistance : number}){

    return <Flex><p>
    {gasResistance}
    </p>
    </Flex>
}