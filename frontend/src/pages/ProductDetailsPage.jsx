import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useGetProductQuery } from "../slices/productApiSlice";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetProductQuery(id);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Product Details</h2>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <Alert variant="danger" className="text-center">
          An error occurred while fetching the product. Please try again later.
        </Alert>
      )}

      {/* Data Display */}
      {isSuccess && (
        <>
          <Button
            variant="secondary"
            className="my-3"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Row className="gy-4">
            {/* Product Image */}
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="rounded shadow-sm"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </Col>
            
            {/* Product Details */}
            <Col md={3}>
              <ListGroup variant="flush" className="shadow-sm rounded-3">
                <ListGroup.Item className="py-3">
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <strong>Price:</strong> ${product.price}
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  {product.description}
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <strong>Brand:</strong> {product.brand}
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <strong>Category:</strong> {product.category}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            
            {/* Add to Cart Section */}
            <Col md={3}>
              <Card className="shadow-sm rounded-3">
                <ListGroup variant="flush">
                  <ListGroup.Item className="py-3">
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-3">
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-3 d-grid">
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            
          </Row>
        </>
      )}

      {/* Fetching State */}
      {isFetching && (
        <div className="text-center my-3">
          <Spinner animation="grow" role="status" variant="primary">
            <span className="visually-hidden">Fetching Data...</span>
          </Spinner>
        </div>
      )}
    </Container>
  );
};

export default ProductDetailsPage;
