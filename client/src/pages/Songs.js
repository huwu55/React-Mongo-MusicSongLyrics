import React from "react";
import API from "../utils/API";


class Songs extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            songs : []
        };
    }

    componentDidMount(){
        API.getAllSongs().then(res=>{
            if(res.error)
                return console.log(res.error);

            this.setState({songs: res});
        });
    }

    render(){
        return (
            <div className="API">
                <pre>{JSON.stringify(this.state.songs, null, 2) }</pre>
            </div>
        );
    }
}

export default Songs;
