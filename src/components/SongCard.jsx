import React from "react";
import { Howl, Howler } from "howler";

import Card from "./Card";
import Button from "./Button";

const SongCard = ({ title, songSrc }) => {
  const audio = songSrc
    ? new Howl({
        src: songSrc,
        html5: true,
      })
    : null;

  return (
    <Card w="10rem" br="0.5rem">
      <p>{title ? title : "Song Title"}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => audio?.play()} disabled={!audio}>
          Play
        </Button>
        <Button onClick={() => audio?.stop()} disabled={!audio}>
          Stop
        </Button>
      </div>
    </Card>
  );
};

export default SongCard;
