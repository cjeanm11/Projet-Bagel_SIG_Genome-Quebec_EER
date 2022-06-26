import React from 'react'

import './SignUpPage.css'
import {ChakraProvider} from "@chakra-ui/react";
import SignUp from "./SignUp";
export const SignUpPage = (props) => {
    return (
        <div className="wrapper">
            <ChakraProvider>
                <SignUp />
            </ChakraProvider>
        </div>
    )
}
