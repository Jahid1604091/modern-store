import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner, Alert, Container, Form, Button } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { data: productsData, isLoading, isError, isFetching, isSuccess } = useGetProductsQuery({
    search: searchTerm,
    page: pageNumber,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPageNumber(1); // Reset to the first page on search
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Latest Products</h2>

      {/* Search Form */}
      <Form onSubmit={handleSearch} className="mb-4 d-flex justify-content-center">
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="me-2"
        />
        <Button type="submit" variant="primary">Search</Button>
      </Form>

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
      {isSuccess && productsData.data && (
        <>
          <Row className="gy-4">
            {productsData.data.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Pagination
            pages={productsData.pages}
            page={pageNumber}
            onPageChange={(page) => setPageNumber(page)}
          />
        </>
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
