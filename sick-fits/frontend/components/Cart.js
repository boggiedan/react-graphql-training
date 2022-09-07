import CartStyles from './styles/CartStyles';
import { useUser } from './User';
import Supreme from './styles/Supreme';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartSate';
import CloseButton from './styles/CloseButton';
import CheckOut from './CheckOut';

const Cart = () => {
  const me = useUser();
  const { isOpen, close } = useCart();

  if (!me) return null;

  return (
    <CartStyles open={isOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <CloseButton onClick={close}>&times;</CloseButton>
      <ul>
        {me.cart.map((item) => (
          <CartItem item={item} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <CheckOut />
      </footer>
    </CartStyles>
  );
};

export default Cart;
