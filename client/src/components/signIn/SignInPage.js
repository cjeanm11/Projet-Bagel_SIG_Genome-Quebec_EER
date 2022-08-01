import React from 'react'

import './SignInPage.css'
import {ChakraProvider} from "@chakra-ui/react";
import {SignIn} from "./SignIn";
export const SignInPage = (props) => {

    return (
        <div className="wrapper">
            <ChakraProvider>
                <SignIn className="signIn" />
            </ChakraProvider>
        </div>
    )
}
