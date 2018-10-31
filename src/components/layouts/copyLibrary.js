import React, { Component } from "react";
import Types from "../../Types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

const copyText = copy => {
  copy.select();
  document.execCommand("copy");
};

class copyLibrary extends Component {
  onClick = id => {
    const copy = document.getElementById(`copyToClipboard-${id}`);
    copyText(copy);
  };

  onClickFunction = id => {
    const { editMode } = this.props;
    if (editMode) {
      return null;
    } else {
      var copy = document.getElementById(`copyToClipboard-${id}`);
      copy.readOnly = true;
      copyText(copy);
    }
  };

  onDeleteClick = id => {
    const { firestore } = this.props;
    firestore.delete({ collection: "copyLibrary", doc: id });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  chooseIcon = type => {
    for (let i = 0; i < Types.length; i++) {
      if (type === Types[i].type) {
        return Types[i].klass;
      }
    }
    return null;
  };
  render() {
    const { copyLibrary, copyMode } = this.props;
    if (copyLibrary) {
      return (
        <div id={copyLibrary.id}>
          <label>
            <i className={this.chooseIcon(copyLibrary.type)} />{" "}
            {copyLibrary.type}
          </label>
          <input
            id={`copyToClipboard-${copyLibrary.id}`}
            defaultValue={copyLibrary.field}
            onClick={this.onClickFunction.bind(this, copyLibrary.id)}
            onChange={this.onChange}
          />
          {copyMode === 0 ? (
            <button onClick={this.onDeleteClick.bind(this, copyLibrary.id)}>
              Delete
            </button>
          ) : (
            <button onClick={this.onClick.bind(this, copyLibrary.id)}>
              Copy
            </button>
          )}
        </div>
      );
    } else {
      return "Loading";
    }
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "copyLibrary"
    }
  ]),
  connect((state, props) => ({
    copyLibraries: state.firestore.ordered.copyLibrary
  }))
)(copyLibrary);
