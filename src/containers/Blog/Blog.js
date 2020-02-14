import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedId: null,
    resultPost: null
  };

  componentDidMount() {
    console.log("prior to axios call");
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: updatedPosts });
        console.log("response value from component did Mount: ");
        console.log(response);
      });
  }

  selectedPost = id => {
    this.setState({ selectedId: id });
    console.log(`selected post id on clicked: ${id}`);
    console.log("log prior to resultPost call");
    this.resultPost(id);
    console.log(`selectedID after resultPost call: ${this.state.selectedId}`);
  };

  //test post function
  resultPost = id => {
    let result = this.state.posts.filter(obj => {
      console.log(this.state.selectedId);
      return obj.id === id;
    });
    console.log("resultPost func result here:");
    console.log(result);
    this.setState({ resultPost: result });
  };
  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Post
          title={post.title}
          key={post.id}
          author={post.author}
          //Either of the props below will pass the event handler as reference with a param
          //   clicked={() => this.selectedPost(post.id)}
          clicked={this.selectedPost.bind(this, post.id)}
        />
      );
    });
    // console.log(`posts value: ${posts[0]}`);
    // console.log(posts);
    // let result = posts.filter(obj => {
    //   console.log(
    //     `The object key: ${obj} & selectedId: ${this.state.selectedId}`
    //   );
    //   return obj.key === this.state.selectedId;
    // });
    return (
      <div>
        {
          (console.log("Render result value: "),
          console.log(this.state.resultPost))
        }
        <section className="Posts">{posts}</section>
        <section>
          <FullPost
            selected={this.state.selectedId}
            all={this.state.resultPost}
          />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
