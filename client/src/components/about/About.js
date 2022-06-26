import React from 'react'

import './About.css'
import {ChakraProvider} from "@chakra-ui/react";
import SectionWithVideo from "../section/sectionWithVideo";
export const About = (props) => {

    return (
        <div className="wrapper">
            <ChakraProvider>
                <SectionWithVideo />
            </ChakraProvider>
        </div>
    )
}
