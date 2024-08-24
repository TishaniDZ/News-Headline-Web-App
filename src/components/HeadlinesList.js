import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import HeadlineCard from "./HeadlineCard";
import { useNavigate } from "react-router-dom"; 

const HeadlinesList = () => {
  const [headlines, setHeadlines] = useState([]);
  const [page, setPage] = useState(1);  // State for pagination
  const [hasMore, setHasMore] = useState(true);  // State to track if more headlines are available
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchHeadlines();  // Initial fetch
  }, []);

  const fetchHeadlines = async () => {
    const apiKey = "c5b37b147c91474db4ae15a19e9f2f25"; 
    const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.articles.length > 0) {
        setHeadlines((prevHeadlines) => [...prevHeadlines, ...response.data.articles]);
        setPage(page + 1);  // Increment the page number
      } else {
        setHasMore(false);  // No more articles to load
      }
    } catch (error) {
      console.error("Error fetching the headlines:", error);
    }
  };

  const handleHeadlineClick = (headline) => {
    navigate(`/headline/${encodeURIComponent(headline.url)}`); // Pass the article URL as an identifier
  };

  return (
    <div style={{ padding: "20px" }}>
      <InfiniteScroll
        dataLength={headlines.length}
        next={fetchHeadlines}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: "center" }}>No more articles</p>}
      >
        {headlines.map((headline, index) => (
          <HeadlineCard key={index} headline={headline} onClick={() => handleHeadlineClick(headline)} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default HeadlinesList;
