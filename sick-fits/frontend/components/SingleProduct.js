import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

export const GET_PRODUCT_BY_ID_QUERY = gql`
  query GET_PRODUCT_BY_ID_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  grid-gap: 60px;
  min-height: 800px;
  max-width: var(--max-width);
  align-items: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { name, price, description, photo } = data.Product;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fitz | {name}</title>
      </Head>
      <img src={photo?.image.publicUrlTransformed} alt={photo?.altText} />
      <div className="details">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{price}</p>
      </div>
    </ProductStyles>
  );
};

export default SingleProduct;
