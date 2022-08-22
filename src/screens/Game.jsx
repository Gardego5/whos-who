import React from "react";
import styled from "styled-components";

import ProgressBar from "../components/ProgressBar";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";

const StyledContainer = styled.div`
  & header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
  }
  & header h1 {
    margin: 0;
  }
  & div.flex-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1rem;
  }
`;

const Game = () => {
  return (
    <StyledContainer>
      <header>
        <h1>Who's Who?</h1>
        <ProgressBar />
      </header>
      <main>
        <div className="flex-row" id="songs">
          <SongCard />
          <SongCard />
          <SongCard />
        </div>
        <div className="flex-row" id="artists">
          <ArtistCard />
          <ArtistCard />
          <ArtistCard />
          <ArtistCard />
        </div>
      </main>
    </StyledContainer>
  );
};

export default Game;
