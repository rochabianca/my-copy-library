import React, { Component } from "react";
import Types from "../../Types";

class copyLibrary extends Component {
  onClick = id => {
    var copyText = document.getElementById(`copyToClipboard-${id}`);
    copyText.select();
    document.execCommand("copy");
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
    const { copyLibrary } = this.props;
    if (copyLibrary) {
      return (
        <div>
          <label>
            <i className={this.chooseIcon(copyLibrary.type)} />{" "}
            {copyLibrary.type}
          </label>
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
