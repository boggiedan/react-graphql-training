import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const GET_PRODUCT_BY_ID_QUERY = gql`
  query GET_PRODUCT_BY_ID_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
    }
  }
`;

const SingleProduct = ({ query: { id } }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID_QUERY, {
    variables: { id },
  });

  return (
    <div>
      <h1>Product Page {id}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.Product && (
        <div>
          <h2>{data.Product.name}</h2>
          <p>{data.Product.description}</p>
          <p>{data.Product.price}</p>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
