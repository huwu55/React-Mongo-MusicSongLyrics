import React from "react";

export default (prop) => {
    return (
        <div id="signup" className="container intro">
            <div className="row justify-content-md-center">
                <form onSubmit={prop.submitSignup}>
                    <div className="col-12 formgroup">
                        {/* <label>Username</label> */}
                        <input type="text" className="form-control" placeholder="Create Username" />
                        {/* <lable>Password</lable> */}
                        <input type="password" className="form-control" placeholder="Create Password" />
                        <input type="password" className="form-control" placeholder="Confirm Password" />
                    </div>
                    <button className="btn btn-secondary submit" type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}