import React from "react";

export default (prop) => {
    return (
        <div id="login" className="container intro">
            <div className="row justify-content-md-center">
                <form onSubmit={prop.submitLogin}>
                    <div className="col-12 formgroup">
                        {/* <label>Username</label> */}
                        <input type="text" className="form-control" placeholder="Username" />
                        {/* <lable>Password</lable> */}
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <button className="btn btn-secondary submit" type="submit">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}