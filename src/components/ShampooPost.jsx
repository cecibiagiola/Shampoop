import { useState, useEffect } from "react";
import "./ShampooPost.css";
import HeartIcon from "./icons/HeartIcon";
import CommentIcon from "./icons/CommentIcon";
import ShareIcon from "./icons/ShareIcon";
import SaveIcon from "./icons/SaveIcon";

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

  const [saved, setSaved] = useState(false);



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

  function toggleSave() {
  setSaved((prev) => !prev);
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
      <HeartIcon liked={liked} onClick={toggleLike} />
      <CommentIcon />
      <ShareIcon />
      <SaveIcon saved={saved} onClick={toggleSave} />
    </div>

      <div className="post-likes">{likes} Me gusta</div>

      <div className="post-caption">{name}</div>
    </article>
  );
}

export default ShampooPost;
