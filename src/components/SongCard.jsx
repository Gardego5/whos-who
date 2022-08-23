import React from "react";
import { Howl, Howler } from "howler";

import Card from "./Card";
import Button from "./Button";

const SongCard = ({ title, onPlay, onStop }) => {
  return (
    <Card w="10rem" br="0.5rem">
      <p>{title ? title : "Song Title"}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onPlay} br="0.5rem" b="1px solid black">
          Play
        </Button>
        <Button onClick={onStop} br="0.5rem" b="1px solid black">
          Stop
        </Button>
      </div>
    </Card>
  );
};

export default SongCard;
