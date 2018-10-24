import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class AddCopyLibrary extends Component {
  state = {
    type: "",
    field: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newCopyLibrary = this.state;
    const { firestore, history } = this.props;
    // todo: error message if the type or field are empty
    if (newCopyLibrary.type !== "" && newCopyLibrary.field !== "") {
      firestore
        .add({ collection: "copyLibrary" }, newCopyLibrary)
        .then(() => history.push("/"));
    }
  };
  render() {
    const { type, field } = this.state;
    return (
      <div>
        <div className="col-md-6">
          <h1>Add Client</h1>
          <div>
            <form onSubmit={this.onSubmit}>
              <div>
                <label htmlFor="type">type</label>
                <input
                  type="text"
                  name="type"
                  required
                  onChange={this.onChange}
                  value={type}
                />
              </div>

              <div>
                <label htmlFor="field">Field</label>
                <input
                  type="text"
                  name="field"
                  required
                  onChange={this.onChange}
                  value={field}
                />
              </div>
              <input type="submit" value="Add" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default firestoreConnect()(AddCopyLibrary);
