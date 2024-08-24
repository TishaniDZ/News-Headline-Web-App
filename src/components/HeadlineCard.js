
import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const HeadlineCard = ({ headline }) => {
  const { title, source, author, publishedAt, description, urlToImage } = headline;
  const fallbackImage = "https://via.placeholder.com/150";

  console.log(headline); //  Check the structure of headline
  console.log(headline.urlToImage); // Check if the URL is valid


  return (
    <Link
      to={`/headline/${encodeURIComponent(title)}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        className="h-100 shadow-sm"
        style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease", borderRadius: "15px" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        }}
      >
        <Card.Img
          variant="top"
          src={urlToImage || fallbackImage} 
          alt={title}
          onError={(e) => {e.target.src = fallbackImage;}}
          style={{
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{title}</Card.Title>
          <Card.Text style={{ color: "#888", marginBottom: "8px" }}>
            <strong>Source:</strong> {source.name} | <strong>Author:</strong> {author || "Unknown"}
          </Card.Text>
          <Card.Text style={{ color: "#888", marginBottom: "8px" }}>
            <strong>Date:</strong> {new Date(publishedAt).toLocaleDateString()}
          </Card.Text>
          <Card.Text style={{ color: "#555", lineHeight: "1.6", flexGrow: 1 }}>
            {description}
          </Card.Text>
          <Button variant="outline-dark" as={Link} to={`/headline/${encodeURIComponent(title)}`}>
            Read More
          </Button>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default HeadlineCard;
