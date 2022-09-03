import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const updateCache = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProductAction = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update: updateCache,
  });

  const handleClick = async () => {
    if (confirm('Are you sure you want to delete that item? ')) {
      try {
        await deleteProduct();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <button type="button" disabled={loading} onClick={handleClick}>
      {children}
    </button>
  );
};

export default DeleteProductAction;
