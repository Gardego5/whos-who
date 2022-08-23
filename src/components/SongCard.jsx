import React from "react";

import Card from "./Card";

const SongCard = ({ title }) => {
  return (
    <Card w="10rem" h="4rem" br="0.5rem">
      <p>{ title ? title : "Song Title" }</p>
    </Card>
  );
};

export default SongCard;
