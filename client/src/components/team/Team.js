import React from 'react'

import './Team.css'
import {ChakraProvider} from "@chakra-ui/react";
import SectionWithVideo from "../section/sectionWithVideo";
export const Team = (props) => {

    return (
        <div className="wrapper">
            <ChakraProvider>
                <SectionWithVideo />
            </ChakraProvider>
        </div>
    )
}
