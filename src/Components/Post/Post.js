import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      imgUrl: "",
      content: "",
    };
  }

  handleInputTitle = (val) => {
    this.setState({ title: val });
  };
  handleInputImgUrl = (val) => {
    this.setState({ imgUrl: val });
  };
  handleInputContent = (val) => {
    this.setState({ content: val });
  };

  updatePost = () => {
    axios
      .post("/api/post", this.state)
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="Post_list">
        <h1>NEW POST</h1>
        <h3> Title </h3>
        <input
          value={this.state.title}
          placeholder="New title"
          onChange={(e) => this.handleInputTitle(e.target.value)}
        />

        <img src={this.state.imgUrl} alt={this.title} className="Post_img" />
        <h3> Image URL </h3>
        <input
          value={this.state.imgUrl}
          placeholder="New image"
          onChange={(e) => this.handleInputImgUrl(e.target.value)}
        />
        <h3> Content </h3>
        <input
          value={this.state.content}
          placeholder="New content"
          onChange={(e) => this.handleInputContent(e.target.value)}
        />

        <button id="post_submit" onClick={this.updatePost}>
          Post
        </button>
      </div>
    );
  }
}

export default withRouter(Post);
