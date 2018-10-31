import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import CopyLibrary from "../layouts/copyLibrary";

class EditCopyLibrary extends Component {
  onClickSave = () => {
    // Pegar o valor do campo do componente CopyLibrary (todos)
    // Mandar para o firestore
    // ir para a homepage
    // const { copyLibraries } = this.state;
    // console.log(copyLibraries);
  };
  render() {
    const { copyLibraries } = this.props;

    if (copyLibraries) {
      return (
        <div>
          <h1>Edit Mode</h1>
          <button onClick={this.onClickSave}>Save</button>
          {copyLibraries.map(copyLibrary => (
            <div key={copyLibrary.id}>
              <CopyLibrary
                editMode={1}
                copyLibrary={copyLibrary}
                copyMode={0}
              />
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
