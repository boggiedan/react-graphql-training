import { KeystoneContext } from '@keystone-next/types';
import {
  CartItemCreateInput,
  CartItemWhereUniqueInput,
} from '../.keystone/schema-types';
import { Session } from '../types';

const addToCart = async (
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> => {
  console.log('ADDING TO CART');
  const session = context.session as Session;

  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });
  const [existingCartItem] = allCartItems as Array<
  CartItemCreateInput & CartItemWhereUniqueInput
  >;

  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );

    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }

  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
};

export default addToCart;
