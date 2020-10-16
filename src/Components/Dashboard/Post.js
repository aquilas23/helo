import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      title: "",
      imgUrl: "",
      content: "",
    };
  }
  deletePost = (id) => {
    axios
      .delete(`/api/post/${id}`)
      .then(() => {
        this.getUserPosts();
      })
      .catch((err) => console.log(err));
  };
  updatePost = () => {
    axios
      .put(`/api/post/${this.props.post.id}`, this.state)
      .then(() => {
        this.getUserPosts();
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div key={this.props.post.id} className="post-box">
        {!this.state.edit ? (
          <>
            <h3>{this.props.post.title}</h3>
            <img
              src={this.props.post.imgUrl}
              alt="post"
              className="post-image"
            />
            <p>{this.props.post.content}</p>
          </>
        ) : (
          <>
            <input />
            <input />
            <input />
          </>
        )}
        {this.state.edit ? "here" : "nope"}
        {this.state.edit ? (
          <button onClick={() => this.updatePost}>Update</button>
        ) : (
          <button onClick={() => this.setState({ edit: !this.state.edit })}>
            Edit
          </button>
        )}
        <button onClick={() => this.deletePost(this.props.post.id)}>
          Delete
        </button>
      </div>
    );
  }
}
