import React, { Component } from "react";

import "./FullPost.css";

class FullPost extends Component {
  render() {
    let post = this.props.selected ? (
      <div className="FullPost">
        <h1>{this.props.all[0].title}</h1>
        <p>{this.props.all[0].body}</p>
        <div className="Edit">
          <button className="Delete">Delete</button>
        </div>
      </div>
    ) : (
      <p style={{ textAlign: "center" }}>Please select a Post!</p>
    );
    return post;
  }
}

export default FullPost;
