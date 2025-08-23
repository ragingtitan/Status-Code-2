import React from "react";
import DOMPurify from "dompurify";

const Comment = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      className="comment"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default Comment;
