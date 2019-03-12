import React from "react";

export default (prop) => {
    return (
        <div id="login" className="container intro">
            <div className="row justify-content-md-center">
                <form onSubmit={prop.login}>
                    <input type="text" className="form-control" placeholder="Username" />
                    <input type="password" className="form-control" placeholder="Password" />
                    <button className="btn btn-secondary submit" type="submit">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}