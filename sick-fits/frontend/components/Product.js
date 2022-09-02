import Link from 'next/link';
import Item from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

const Product = ({ id, name, photo, price, description }) => (
  <Item>
    <img src={photo?.image.publicUrlTransformed} alt={name} />
    <Title>
      <Link href={`/product/${id}`}>{name}</Link>
    </Title>
    <PriceTag>{formatMoney(price)}</PriceTag>
    <p>{description}</p>
  </Item>
);

export default Product;
