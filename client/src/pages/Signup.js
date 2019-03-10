import React from "react";
import SignupForm from "../components/SignupForm";


class Login extends React.Component {
    render (){
        return (
            <div>
                <h1 className="title">Sign Up</h1>
                <SignupForm />
            </div>
        );
    }
}

export default Login;