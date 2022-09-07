import { list } from '@keystone-next/keystone/schema';
import {
  select,
  text,
  integer,
  relationship,
  virtual,
} from '@keystone-next/fields';

export const OrderItem = list({
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver: (item) =>
        `${item.product.name} - ${item.quantity} x $${item.price}`,
    }),
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    price: integer(),
    quantity: integer(),
    order: relationship({ ref: 'Order.items' }),
  },
});
