import React, { Component } from "react";

class copyLibrary extends Component {
  onClick = id => {
    var copyText = document.getElementById(`copyToClipboard-${id}`);
    copyText.select();
    document.execCommand("copy");
  };
  render() {
    const { copyLibrary } = this.props;
    if (copyLibrary) {
      return (
        <div>
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
      );
    } else {
      return "Loading";
    }
  }
}

export default copyLibrary;
