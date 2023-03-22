import { useState, useEffect } from "react";
import { fetchPosts } from "../api/posts";
import { PostsInput } from "./PostsInput";
import { EditPost } from "./EditPost";
import { Posts } from "../types";
import { User } from "../types";
import "../styles/PostsList.css";

const PostsList = ({ userId }: { userId: number }) => {
  const [allPosts, setAllPosts] = useState<Posts[]>([]);
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    userId: 0,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showFullPost, setShowFullPost] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts().then((data) => setAllPosts(data));
  }, []);

  const addPost = (newPost: Posts) => {
    if (newPost.title && newPost.body) {
      const post: Posts = {
        userId: userId,
        id: allPosts.length + 1,
        title: newPost.title,
        body: newPost.body,
      };
      const newPosts: Posts[] = [...allPosts, post];
      setAllPosts(newPosts);
      setShowFullPost(null);
      setUser(user);
    }
  };
  const editPost = (index: number, updatedPost: Posts) => {
    const newPosts: Posts[] = [...allPosts];
    newPosts[index] = updatedPost;
    setAllPosts(newPosts);
    setEditIndex(null);
    setShowFullPost(null);
  };

  const deletePosts = (index: number) => {
    const newPosts: Posts[] = [...allPosts];
    newPosts.splice(index, 1);
    setAllPosts(newPosts);
  };
  const handleReadMore = (index: number) => {
    setShowFullPost((prevIndex) => (prevIndex === index ? null : index));
    const postBody = document.getElementById(`post-body-${index}`);
    if (postBody) {
      postBody.classList.add("post-full");
    }
  };

  const handleReadLess = () => {
    setShowFullPost(null);
    const postBody = document.querySelector(".post-full");
    if (postBody) {
      postBody.classList.remove("post-full");
    }
  };

  return (
    <>
      <h2>Posts Section</h2>
      <div className="posts-section">
        {allPosts.map((p: Posts, index) => (
          <div className="post" key={index}>
            <h3 className="post-title">{p.title}</h3>
            <div className="post-body" id={`post-body-${index}`}>
              {p.body.length > 100 && showFullPost !== index
                ? `${p.body.slice(0, 100)}...`
                : p.body}
              {p.body.length > 100 && (
                <button
                  className="read-more-button"
                  onClick={() =>
                    showFullPost === index
                      ? handleReadLess()
                      : handleReadMore(index)
                  }
                >
                  {showFullPost === index ? "Leer menos" : "Leer más"}
                </button>
              )}
            </div>
            <p className="post-id">user: {p.userId}</p>
            <div className="post-buttons">
              <button
                className="delete-button"
                onClick={() => deletePosts(index)}
              >
                🗑
              </button>
              <button
                className="edit-button"
                onClick={() => setEditIndex(index)}
              >
                ✏️
              </button>
            </div>

            {editIndex === index && (
              <div>
                <EditPost
                  index={index}
                  initialTitle={p.title}
                  initialBody={p.body}
                  initialuserId={p.userId}
                  onSave={editPost}
                  onCancel={() => setEditIndex(null)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <PostsInput onAddPost={addPost} onEditPost={editPost} />
    </>
  );
};

export default PostsList;
