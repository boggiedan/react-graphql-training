import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useCart } from '../lib/cartSate';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleAddToCart = async () => {
    await addToCart();
  };

  return (
    <button disabled={loading} type="button" onClick={handleAddToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
};

export default AddToCart;
