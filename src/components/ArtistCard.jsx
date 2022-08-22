import React from "react";

import Card from "./Card";
import ProfileSVG from "../assets/profile.svg";

const ArtistCard = ({ picSrc, name }) => {
  return (
    <Card w="7rem" h="11rem" br="0.5rem">
      {picSrc ? <img src={picSrc} alt="Artist Pic" /> : <img src={ProfileSVG} alt="Artist Pic" />}
      <p>{name ? name : "Artist"}</p>
    </Card>
  );
};

export default ArtistCard;
