import { useState, useEffect } from "react";
import "./ShampooPost.css";

function generateUsername(name) {
  const suffixes = ["oficial", "hair", "arg", "beauty"];
  const randomSuffix =
    suffixes[Math.floor(Math.random() * suffixes.length)];

  return (
    "@" +
    name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "_") +
    "_" +
    randomSuffix
  );
}

function ShampooPost({ name, image }) {
  const username = generateUsername(name);
  const storageKey = `like-${name}`;

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(
    Math.floor(Math.random() * 500) + 20
  );

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      setLiked(parsed.liked);
      setLikes(parsed.likes);
    }
  }, []);

  function toggleLike() {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;

    setLiked(newLiked);
    setLikes(newLikes);

    localStorage.setItem(
      storageKey,
      JSON.stringify({ liked: newLiked, likes: newLikes })
    );
  }

  return (
    <article className="post">
      <div className="post-header">{username}</div>

     <img
        src={image}
        alt={name}
        className="post-image"
      />

      <div className="post-actions">
        <span
          className={`icon ${liked ? "liked" : ""}`}
          onClick={toggleLike}
        >
          ❤️
        </span>
        <span className="icon">💬</span>
        <span className="icon">📤</span>
      </div>

      <div className="post-likes">{likes} Me gusta</div>

      <div className="post-caption">{name}</div>
    </article>
  );
}

export default ShampooPost;
