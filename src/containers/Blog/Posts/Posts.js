import React, { Component } from "react";
import axios from "../../../axios";

import Post from "../../../components/Post/Post";
import "./Posts.css";

export default class Posts extends Component {
  state = {
    posts: []
    // selectedPostId: null,
    // error: false
  };

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  componentDidMount() {
    axios
      .get("/posts?_limit=5")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(err => {
        //cancelToken error due to log below when used with interceptor without a return request in func
        console.log(err);
        // this.setState({ error: true });
      });
  }

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            title={post.title}
            key={post.id}
            author={post.author}
            //Either of the props below will pass the event handler as reference with a param
            //   clicked={() => this.postSelectedHandler(post.id)}
            clicked={this.postSelectedHandler.bind(this, post.id)}
          />
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
      </div>
    );
  }
}