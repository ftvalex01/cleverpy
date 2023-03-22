import React, { useState } from "react";
import { Posts } from "../types";
import "../styles/EditPost.css";

type Props = {
  index: number;
  initialTitle: string;
  initialBody: string;
  initialuserId: number;
  onSave: (index: number, updatedPost: Posts) => void;
  onCancel: () => void;
};

export const EditPost: React.FC<Props> = ({
  index,
  initialTitle,
  initialBody,
  initialuserId,
  onSave,
  onCancel,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(initialTitle);
  const [updatedBody, setUpdatedBody] = useState(initialBody);
  const [updatedId, setUpdatedId] = useState(initialuserId);
  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedPost: Posts = {
      userId: initialuserId,
      id: updatedId,
      title: updatedTitle,
      body: updatedBody,
    };

    onSave(index, updatedPost);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="PostsInput__form--edit">
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="updatedTitle">Title:</label>
          <input
            type="text"
            id="updatedTitle"
            value={updatedTitle}
            onChange={(event) => setUpdatedTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="updatedBody">Body:</label>
          <textarea
            id="updatedBody"
            value={updatedBody}
            onChange={(event) => setUpdatedBody(event.target.value)}
          />
        </div>
        <input
          hidden
          type="number"
          id="updatedId"
          value={updatedId}
          onChange={(event) => setUpdatedId(parseInt(event.target.value))}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};
