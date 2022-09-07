import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/cartSate';
import CartCount from './CartCount';

export default function Nav() {
  const user = useUser();
  const { toggle } = useCart();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={toggle}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      ) : (
        <Link href="/signin">Sign In</Link>
      )}
    </NavStyles>
  );
}
