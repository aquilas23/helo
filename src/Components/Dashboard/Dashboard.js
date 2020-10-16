import React, { Component } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import { connect } from "react-redux";
import Post from "./Post"
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postImage: "",
    };
  }
  componentDidMount() {
    this.getUserPosts();
  }
  handleInput = (val) => {
    this.setState({ postImage: val });
  };

  getUserPosts = () => {
    console.log(this.props.user.id);
    axios
      .get(`/api/post/${this.props.user.id}`)
      .then((res) => this.setState({ posts: res.data }))
      .catch((err) => console.log(err));
  };

  createPost = () => {
    axios
      .post("/api/post", {
        id: this.props.user.user_id,
        postImage: this.state.postImage,
      })
      .then(() => {
        this.getUserPosts();
        this.setState({ postImage: "" });
      })
      .catch((err) => console.log(err));
  };
  getPost = (id) => {
    axios
      .post(`/api/post/${id}`, {
        id: this.props.user.user_id,
        postImage: this.state.postImage,
      })
      .then(() => {
        this.getUserPosts();
        this.setState({ postImage: "" });
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.props);
    const mappedPosts = this.state.posts.map((post) => (
     <Post post={post}/>
    ));
    return (
      <div className="dashboard">
        <Nav />
        <input
          value={this.state.postImage}
          placeholder="Search by Title"
          onChange={(e) => this.handleInput(e.target.value)}
        />
        <button>Search</button>
        <button onClick={this.getUserPosts}>My Posts</button>
        <div className="post-flex">{mappedPosts}</div>
      </div>
    );
  }
}
const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps, {})(Dashboard);
