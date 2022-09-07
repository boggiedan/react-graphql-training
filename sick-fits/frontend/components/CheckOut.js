import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import SickButton from './styles/SickButton';
import { useCart } from '../lib/cartSate';
import { CURRENT_USER_QUERY } from './User';

const CheckOutFormStyled = styled.form`
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const CheckOutForm = () => {
  const { close } = useCart();
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const [checkout, { error: mutationError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [
        {
          query: CURRENT_USER_QUERY,
        },
      ],
    }
  );

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    nProgress.start();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    console.log(paymentMethod);

    if (error) {
      setError(error);
      nProgress.done();
      return;
    }

    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    router.push({
      pathname: `/order/[id]`,
      query: { id: order.data.checkout.id },
    });

    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckOutFormStyled onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {mutationError && <p style={{ fontSize: 12 }}>{mutationError.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckOutFormStyled>
  );
};

const CheckOut = () => (
  <Elements stripe={stripeLib}>
    <p>Check Out</p>
    <CheckOutForm />
  </Elements>
);

export default CheckOut;
