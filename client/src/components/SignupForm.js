import React from "react";

export default (prop) => {
    return (
        <div id="signup" className="intro">
            <div class="form">
                <form onSubmit={prop.signup}>
                    <input type="text" className="form-control" placeholder="Create Username" />
                    <input type="password" className="form-control" placeholder="Create Password" />
                    <input type="password" className="form-control" placeholder="Confirm Password" />
                    <button className="btn btn-secondary submit" type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}