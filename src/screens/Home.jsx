import React, { Fragment, useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import fetchFromSpotify, { request } from "../services/api";

import Button from "../components/Button";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(false);
  const [token, setToken] = useState("");

  const [numSongs, setNumSongs] = useState(null);
  const [numArtists, setNumArtists] = useState(null);
  // const [retrievedSelectedGenre, retrievedSetSelectedGenre] = useState("");

  useEffect(() => {
    if (selectedGenre === null) {
      const savedGenre = JSON.parse(localStorage.getItem("genreKey"));
      setSelectedGenre(savedGenre != null ? savedGenre : "");
    }
    localStorage.setItem("genreKey", JSON.stringify(selectedGenre));
  }, [selectedGenre]);

  // const retrievedGenre = JSON.parse(localStorage.getItem("genreKey"));

  const retrievedSelectedGenre = JSON.parse(localStorage.getItem("genreGKey"));
  // if (retrievedSelectedGenre) {
  //   setSelectedGenre = retrievedSelectedGenre;
  // }

  useEffect(() => {
    if (numSongs === null) {
      const savedSongs = JSON.parse(localStorage.getItem("songsKey"));
      setNumSongs(savedSongs != null ? savedSongs : 1);
    }
    localStorage.setItem("songsKey", JSON.stringify(numSongs));
  }, [numSongs]);

  useEffect(() => {
    if (numArtists === null) {
      const savedArtists = JSON.parse(localStorage.getItem("artistsKey"));
      setNumArtists(savedArtists != null ? savedArtists : 2);
    }
    localStorage.setItem("artistsKey", JSON.stringify(numArtists));
  }, [numArtists]);

  const loadGenres = async (t) => {
    setConfigLoading(true);
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "recommendations/available-genre-seeds",
    });
    console.log(response);
    setGenres(response.genres);
    setConfigLoading(false);
  };

  useEffect(() => {
    setAuthLoading(true);

    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        setAuthLoading(false);
        setToken(storedToken.value);
        loadGenres(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      setAuthLoading(false);
      setToken(newToken.value);
      loadGenres(newToken.value);
    });
  }, []);

  if (authLoading || configLoading) {
    return <div>Loading...</div>;
  }

  const handleChange1 = (e) => {
    setNumSongs(e.target.value);
    console.log(e.target.value);
  };

  const handleChange2 = (e) => {
    setNumArtists(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Fragment>
      <Route path="/game" />
      <h1>Who's Who?</h1>
      <div>
        Genre:
        <select
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value)}
        >
          <option value="" />
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        Number of Songs per Guess:
        <input
          type="range"
          min="1"
          max="3"
          value={numSongs}
          onChange={handleChange1}
        ></input>
        <p>Value: {numSongs}</p>
      </div>
      <div>
        Number of Artists to Guess:
        <input
          type="range"
          min="2"
          max="4"
          value={numArtists}
          onChange={handleChange2}
        ></input>
        <p>Value: {numArtists}</p>
      </div>
      <Link to={"/game"}>
        <Button
          className="submitWho"
          h={"55px"}
          w={"180px"}
          br={"20px"}
          // p={"absolute"}
          // t={"15%"}
          // l={"42.4%"}
          // onClick={foundUsers}
        >
          Begin
        </Button>
      </Link>
    </Fragment>
  );
};

export default Home;
