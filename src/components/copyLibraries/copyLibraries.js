import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import CopyLibrary from "../layouts/copyLibrary";

class copyLibraries extends Component {
  render() {
    const { copyLibraries } = this.props;

    if (copyLibraries) {
      return (
        <div>
          {copyLibraries.map(copyLibrary => (
            <div key={copyLibrary.id}>
              <CopyLibrary copyLibrary={copyLibrary} />
            </div>
          ))}
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

copyLibraries.propTypes = {
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
)(copyLibraries);
