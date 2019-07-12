import React from "react";
import API from "../utils/API";


class Users extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            users : []
        };
    }

    componentDidMount(){
        API.getUsers().then(res=>{
            if(res.error)
                return console.log(res.error);
            this.setState({users: res});
        });
    }

    render(){
        return (
            <div className="API">
                <pre>{JSON.stringify(this.state.users, null, 2) }</pre>
            </div>
        );
    }
}

export default Users;
