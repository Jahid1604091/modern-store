import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="m-2 p-2 ">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={Product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">{product.price} BDT</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
