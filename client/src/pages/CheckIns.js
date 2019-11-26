import React from "react";
import API from "../utils/API";


class CheckIns extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            checkIns : []
        };
    }

    componentDidMount(){
        API.getCheckIns().then(res=>{
            if(res.error)
                return console.log(res.error);
            //console.log(res);
            this.setState({checkIns: res});
        }).catch(err=>{
            console.log(err);
        });
    }

    render(){
        return (
            <div className="API">
                <pre>{JSON.stringify(this.state.checkIns, null, 2) }</pre>
            </div>
        );
    }
}

export default CheckIns;
