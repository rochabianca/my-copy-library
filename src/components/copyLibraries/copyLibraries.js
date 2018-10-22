import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class copyLibraries extends Component {
  onClick = id => {
    var copyText = document.getElementById(`copyToClipboard-${id}`);
    copyText.select();
    document.execCommand("copy");
  };
  render() {
    const { copyLibraries } = this.props;

    if (copyLibraries) {
      return (
        <div>
          {copyLibraries.map(copyLibrary => (
            <div key={copyLibrary.id}>
              <label>{copyLibrary.type}</label>
              <input
                id={`copyToClipboard-${copyLibrary.id}`}
                value={copyLibrary.field}
                readOnly
              />
              <button onClick={this.onClick.bind(this, copyLibrary.id)}>
                Copy
              </button>
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
