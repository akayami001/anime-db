import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./App.css";

const App = () => {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");

  const getTopAnime = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v3/top/anime/1/bypopularity`
    ).then((res) => res.json());

    setTopAnime(temp.top.slice(0, 10));
  };

  const HandleSearch = (e) => {
    e.preventDefault();
    FetchAnime(search);
  };

  const FetchAnime = async (query) => {
    const temp = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=descending&limit=10`
    ).then((res) => res.json());

    console.log(temp.results);

    setAnimeList(temp.results);
  };

  useEffect(() => {
    getTopAnime();
  }, []);

  return (
    <div className="container-fluid anime-app">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent
          HandleSearch={HandleSearch}
          search={search}
          setSearch={setSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
};

export default App;
