import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import ProgressBar from "../components/ProgressBar";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";
import fetchFromSpotify from "../services/api";
import { async } from "regenerator-runtime";

const TOKEN_KEY = "whos-who-access-token";

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

const randomLetter = () => 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));

const Game = () => {
  const [renderOverride, updateRenderOverride] = useState();
  const [token, setToken] = useState("");
  const [initialSong, setInitialSong] = useState();
  const [songs, updateSongs] = useState();
  const [artists, updateArtists] = useState();

  const getRandomSong = async (genre) => {
    const response = await fetchFromSpotify({
      token,
      endpoint: "search",
      params: {
        q: `${randomLetter()} genre:${genre}`,
        type: "track",
        offset: Math.floor(Math.random() * 4),
      }
    });

    setInitialSong(response.tracks.items[Math.floor(Math.random() * 20)]);
  }
  
  const getArtists = async () => {
    const artistsResponse = await fetchFromSpotify({
      token,
      endpoint: `artists/${initialSong.artists[0].id}/related-artists`,
    });
    updateArtists(artistsResponse.artists)
  };

  const getSongs = async () => {
    const songsResponse = await fetchFromSpotify({
      token,
      endpoint: `artists/${initialSong.artists[0].id}/top-tracks`,
    });
    updateSongs(songsResponse);
  };

  useEffect(() => {
    if (!token) {
      const storedTokenString = localStorage.getItem(TOKEN_KEY);
      if (storedTokenString) {
        const storedToken = JSON.parse(storedTokenString);
        if (storedToken.expiration > Date.now()) {
          console.log("Token found in localstorage");
          setToken(storedToken.value);
        } else {
          return updateRenderOverride(<Redirect to="/" />);
        }
      } else { 
        return updateRenderOverride(<Redirect to="/" />);
      }
    }

    if (token && !initialSong) getRandomSong("rock");
    if (token && initialSong && !artists) getArtists();
    if (token && initialSong && !songs) getSongs();
  });

  return renderOverride ? (
    renderOverride
  ) : (
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
