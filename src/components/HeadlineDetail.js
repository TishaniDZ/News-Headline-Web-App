import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HeadlineDetail = () => {
  const { id } = useParams(); // Assuming `id` is the encoded article URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const decodedUrl = decodeURIComponent(id); 
        const apiKey = "c5b37b147c91474db4ae15a19e9f2f25";
        const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(decodedUrl)}&apiKey=${apiKey}`);
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setArticle(data.articles[0]);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        setError("Failed to fetch article details");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{article.title}</h1>
      <img src={article.urlToImage} alt={article.title} style={{ maxWidth: "100%" }} />
      <p><strong>Author:</strong> {article.author || "Unknown"}</p>
      <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
      <p>{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
  );
};

export default HeadlineDetail;
