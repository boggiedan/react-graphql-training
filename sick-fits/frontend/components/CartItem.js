import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const StyledCartItem = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ item }) => {
  const { product } = item;

  return (
    <StyledCartItem>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={item.product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * item.quantity)}
          {' - '}
          <em>
            {item.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
        <RemoveFromCart id={item.id} />
      </div>
    </StyledCartItem>
  );
};

export default CartItem;
