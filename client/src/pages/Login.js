import React from "react";
import LoginForm from "../components/LoginForm";

class Login extends React.Component {
    render (){
        return (
            <div>
                <h1 className="title">Log In</h1>
                <LoginForm />
            </div>
        );
    }
}

export default Login;