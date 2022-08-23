import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import ProgressBar from "../components/ProgressBar";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";
import fetchFromSpotify from "../services/api";

const TOKEN_KEY = "whos-who-access-token";
const GENRE_KEY = "genreKey";
const SONGS_KEY = "songsKey";
const ARTISTS_KEY = "artistsKey";
const RESULTS_KEY = "RESULTS_KEY";

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
    align-items: stretch;
    gap: 1rem;
    margin: 1rem;
  }
`;

const randomLetter = () =>
  "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));

const randomChoices = (arr, count) =>
  arr.sort(() => Math.random() - 0.5).slice(0, count);

const Game = () => {
  const [renderOverride, updateRenderOverride] = useState();
  const [token, setToken] = useState("");
  const [initialSong, setInitialSong] = useState();
  const [songs, updateSongs] = useState();
  const [artists, updateArtists] = useState();

  const [config, updateConfig] = useState({
    retrievedGenre: JSON.parse(localStorage.getItem(GENRE_KEY)),
    retrievedSongs: Number.parseInt(
      JSON.parse(localStorage.getItem(SONGS_KEY))
    ),
    retrievedArtists: Number.parseInt(
      JSON.parse(localStorage.getItem(ARTISTS_KEY))
    ),
  });

  /* * * Game * * */
  const [game, updateGame] = useState({
    tries: 2,
  });

  const testCorrect = (artist, correct) => (event) => {
    if (correct) {
      localStorage.setItem(RESULTS_KEY, JSON.stringify({ game, win: true }));
      updateRenderOverride(<Redirect to="result" />);
      return;
    } else {
      if (game.tries > 0) {
        updateArtists(artists.filter((a) => a.artist !== artist));
        updateGame({ ...game, tries: game.tries - 1 });
      } else {
        localStorage.setItem(RESULTS_KEY, JSON.stringify({ game, win: false }));
      }
    }
  };
  /* * * Game * * */

  const getRandomSong = async (genre) => {
    const response = await fetchFromSpotify({
      token,
      endpoint: "search",
      params: {
        q: `${randomLetter()} genre:${genre}`,
        type: "track",
        offset: Math.floor(Math.random() * 4),
      },
    });

    setInitialSong(response.tracks.items[Math.floor(Math.random() * 20)]);
  };

  const getArtists = async () => {
    const originalArtist = await fetchFromSpotify({
      token,
      endpoint: `artists/${initialSong.artists[0].id}`,
    });

    const artistsResponse = await fetchFromSpotify({
      token,
      endpoint: `artists/${initialSong.artists[0].id}/related-artists`,
    });

    updateArtists(
      randomChoices(artistsResponse.artists, config.retrievedArtists - 1)
        .map((artist) => ({ correct: false, artist }))
        .concat([{ correct: true, artist: originalArtist }])
    );
  };

  const getSongs = async () => {
    const songsResponse = await fetchFromSpotify({
      token,
      endpoint: `search`,
      params: {
        q: `artist:${initialSong.artists[0].name}`,
        type: "track",
      },
    });

    updateSongs(
      randomChoices(
        songsResponse.tracks.items,
        config.retrievedSongs - 1
      ).concat([initialSong])
    );
  };

  useEffect(() => {
    if (!token) {
      const storedTokenString = localStorage.getItem(TOKEN_KEY);
      if (storedTokenString) {
        const storedToken = JSON.parse(storedTokenString);
        if (storedToken.expiration > Date.now()) {
          console.log("Token found in localStorage");
          setToken(storedToken.value);
        } else {
          return updateRenderOverride(<Redirect to="/" />);
        }
      } else {
        return updateRenderOverride(<Redirect to="/" />);
      }
    }

    if (token && !initialSong) getRandomSong(config.retrievedGenre);
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
          {artists === undefined
            ? Array(config.retrievedSongs)
                .fill(null)
                .map((none, idx) => <SongCard key={idx} />)
            : songs.map((song, idx) => (
                <SongCard
                  key={idx}
                  title={song.name}
                  songSrc={song.preview_url}
                />
              ))}
        </div>
        <div className="flex-row" id="artists">
          {artists === undefined
            ? Array(config.retrievedArtists)
                .fill(null)
                .map((none, idx) => <ArtistCard key={idx} />)
            : artists.map(({ artist, correct }, idx) => (
                <ArtistCard
                  key={idx}
                  picSrc={artist?.images[0]?.url}
                  name={artist.name}
                  onClick={testCorrect(artist, correct)}
                />
              ))}
        </div>
      </main>
    </StyledContainer>
  );
};

export default Game;
