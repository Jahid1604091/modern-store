import React from "react";
import { Col, Row, Spinner, Alert } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomePage = () => {
  const { data:products, isLoading, isError, isFetching, isSuccess } = useGetProductsQuery();

  return (
    <>
      <h2>Latest Products</h2>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <Alert variant="danger">
          An error occurred while fetching the products. Please try again later.
        </Alert>
      )}

      {/* Data Display */}
      {isSuccess && (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

      {/* Fetching State */}
      {isFetching && (
        <div className="text-center my-3">
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Fetching Data...</span>
          </Spinner>
        </div>
      )}
    </>
  );
};

export default HomePage;
