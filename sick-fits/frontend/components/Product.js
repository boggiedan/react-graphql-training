import Link from 'next/link';
import Item from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProductAction from './DeleteProductAction';
import AddToCart from './AddToCart';

const Product = ({ id, name, photo, price, description }) => (
  <Item>
    <img src={photo?.image.publicUrlTransformed} alt={name} />
    <Title>
      <Link href={`/product/${id}`}>{name}</Link>
    </Title>
    <PriceTag>{formatMoney(price)}</PriceTag>
    <p>{description}</p>
    <div className="buttonList">
      <Link
        href={{
          pathname: 'update',
          query: {
            id,
          },
        }}
      >
        Edit ✏️
      </Link>
      <AddToCart id={id} />
      <DeleteProductAction id={id}>Delete</DeleteProductAction>
    </div>
  </Item>
);

export default Product;
