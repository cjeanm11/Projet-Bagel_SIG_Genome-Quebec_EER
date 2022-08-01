import React from 'react'

import './About.css'
import {ChakraProvider} from "@chakra-ui/react";
import SectionWithVideo from "../section/sectionWithVideo";
import StatsCard from "../section/StatsCard";
export const About = (props) => {

    return (
        <div className="wrapper">
                <SectionWithVideo />
                <StatsCard />
        </div>
    )
}
