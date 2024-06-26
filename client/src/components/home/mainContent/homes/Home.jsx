/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Side from "../../sideContent/side/Side";
import Life from "../life/Life";
import Music from "../musics/Music";
import Popular from "../popular/Popular";
import Ppost from "../Ppost/Ppost";
import "./style.css";

const Homes = () => {
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    const apiKey = "8f32b7d45db04cc2bab08310586753dd";

    fetch(`https://newsapi.org/v2/top-headlines?country=US&apikey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setTopNews(data))
      .catch((error) => console.error("Error fetching top headlines:", error));
  }, []);
  // console.log(topNews);

  const randomArticles = topNews?.articles;
  // console.log(randomArticles);

  const removeDuplicates = () => {
    if (!randomArticles) return [];
    return randomArticles.filter(
      (article) => article?.source.id !== null && article?.urlToImage !== null
    );
  };

  const filteredArticles = removeDuplicates();
  // console.log(filteredArticles);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/get-posts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  console.log(posts);

  return (
    <>
      <main>
        <div className="container overflow-hidden">
          <section className="mainContent">
            <Popular popular={posts} />
            <Ppost />
            <Life />
            <Music />
          </section>
          <section className="sideContent">
            <Side />
          </section>
        </div>
      </main>
    </>
  );
};

export default Homes;
