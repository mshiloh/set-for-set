import React from "react";
import { connect } from "react-redux";

function ProfileViewEdit(props) {
    return (
        <div className="signup-form-wrapper">
            <form className="signup-form-container" onSubmit={props.handleSubmit}>
                <h3 className="signup-head">Profile</h3>
                <input className="signup-form-input" onChange={props.handleChange}
                    value={props.inputs.name}
                    name="name"
                    type="text"
                    placeholder="Name" />

                <input className="signup-form-input" onChange={props.handleChange}
                    value={props.inputs.email}
                    name="email"
                    type="text"
                    placeholder="Email" />
                <input className="signup-form-input" onChange={props.handleChange}
                    value={props.inputs.avatar}
                    name="avatar"
                    type="url"
                    placeholder="Change Avatar" />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <button className="signup-butt" onClick={props.toggleIsEditing}>Back to Profile</button>
                    <button className="signup-butt" type="submit">Save Changes</button>
                    <button style={{ width: "45px", height: "35px", padding: "0px", backgroundColor: "red" }} className="signup-butt" onClick={props.handleDeleteUser}>DELETE Profile</button>
                </div>

                {props.errMsg && <p>{props.errMsg}</p>}

            </form>

        </div>
    )
}

export default connect(state => state.user, {})(ProfileViewEdit);
// export default ProfileViewEdit;