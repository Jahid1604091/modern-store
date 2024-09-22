import React from "react";
import { Col, Row, Spinner, Alert, Container } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomePage = () => {
  const { data: products, isLoading, isError, isFetching, isSuccess } = useGetProductsQuery();

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Latest Products</h2>

      {/* Loading State */}
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <Alert variant="danger" className="text-center">
          An error occurred while fetching the products. Please try again later.
        </Alert>
      )}

      {/* Data Display */}
      {isSuccess && (
        <Row className="gy-4">
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

      {/* Fetching State */}
      {isFetching && (
        <div className="d-flex justify-content-center align-items-center my-3">
          <Spinner animation="grow" role="status" variant="primary">
            <span className="visually-hidden">Fetching Data...</span>
          </Spinner>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
