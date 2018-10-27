import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import CopyLibrary from "../layouts/copyLibrary";

class EditCopyLibrary extends Component {
  render() {
    const { copyLibraries } = this.props;

    if (copyLibraries) {
      return (
        <div>
          <h1>Edit Mode</h1>
          {copyLibraries.map(copyLibrary => (
            <div key={copyLibrary.id}>
              <CopyLibrary copyLibrary={copyLibrary} />
            </div>
          ))}
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

EditCopyLibrary.propTypes = {
  firestore: PropTypes.object.isRequired,
  copyLibraries: PropTypes.array
};

export default compose(
  firestoreConnect([
    {
      collection: "copyLibrary"
    }
  ]),
  connect((state, props) => ({
    copyLibraries: state.firestore.ordered.copyLibrary
  }))
)(EditCopyLibrary);
