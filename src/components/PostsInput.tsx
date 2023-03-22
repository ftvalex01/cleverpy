import React, { useState } from "react";
import { Posts } from "../types";
import "../styles/PostsInputs.css";

type FormElement = React.FormEvent<HTMLFormElement>;

interface Props {
  onAddPost: (newPost: Posts) => void;
  onEditPost: (index: number, updatedPost: Posts) => void;
  postToEdit?: Posts;
}

export const PostsInput = ({ onAddPost, onEditPost, postToEdit }: Props) => {
  const [newPost, setNewPost] = useState<Posts>({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  });

  const handleFormSubmit = (event: FormElement) => {
    event.preventDefault();

    if (postToEdit !== undefined) {
      onEditPost(postToEdit.id - 1, newPost);
    } else {
      onAddPost(newPost);
    }

    setNewPost({
      userId: 0,
      id: 0,
      title: "",
      body: "",
    });
  };

  return (
    <>
      <div className="new-post-header">
        <h2 className="new-post-title">
          {postToEdit ? "Edit Post" : "New Post"}
        </h2>
      </div>
      <div className="new-post">
        <form onSubmit={handleFormSubmit}>
          <div className="input-container">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              value={postToEdit ? postToEdit.title : newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
          </div>

          <div className="input-container">
            <label htmlFor="body">Comentario:</label>
            <textarea
              id="body"
              value={postToEdit ? postToEdit.body : newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            ></textarea>
          </div>

          <button type="submit">
            {postToEdit ? "Save" : "Enviar comentario"}
          </button>
        </form>
      </div>
    </>
  );
};
