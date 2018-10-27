import React, { Component } from "react";
// import { compose } from "redux";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import Select from "react-select";
import { firestoreConnect } from "react-redux-firebase";

class AddCopyLibrary extends Component {
  state = {
    type: "",
    field: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeSelectValue = selectedOption => {
    this.setState({ type: selectedOption.value });
    console.log("Option selected: ", selectedOption.value);
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
    } else {
      this.setState({
        errors: {
          type: "danger",
          message: "please select the type"
        }
      });
    }
  };
  render() {
    const { type, field, errors } = this.state;
    const options = [
      { value: "github", label: "Github" },
      { value: "behance", label: "Behance" },
      { value: "dribbble", label: "Dribbble" },
      { value: "bitbucket", label: "Bitbucket" },
      { value: "gitlab", label: "Gitlab" },
      { value: "googlePlay", label: "Google Play" },
      { value: "youtube", label: "Youtube" },
      { value: "linkedin", label: "Linkedin" },
      { value: "other", label: "Other" }
    ];
    return (
      <div>
        <div className="col-md-6">
          <h1>Add Client</h1>
          <div>
            <form onSubmit={this.onSubmit}>
              <div>
                <label>Category</label>
                <Select
                  defaultValue={type}
                  onChange={this.changeSelectValue}
                  options={options}
                />
                {errors !== {} ? (
                  <div className={`error ${errors.type}`}>
                    <p>{errors.message}</p>
                  </div>
                ) : null}
              </div>

              <div>
                <label htmlFor="field">Paste</label>
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
