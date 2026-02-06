import shampoos from "../data/shampoos";
import ShampooPost from "./ShampooPost";
import Disclaimer from "./Disclaimer";
import "./Feed.css";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function Feed() {
  const shuffledShampoos = shuffleArray(shampoos);

  return (
    <main className="feed">
      {shuffledShampoos.map((shampoo) => (
        <ShampooPost
          key={shampoo.id}
          name={shampoo.name}
          image={shampoo.image}
        />
      ))}
      <Disclaimer />
    </main>
  );
}

export default Feed;
