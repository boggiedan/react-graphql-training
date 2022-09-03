import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { GET_PRODUCT_BY_ID_QUERY } from './SingleProduct';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';
import useForm from '../lib/useForm';

const UPDATE_PRODUCTY_MUTATION = gql`
  mutation UPDATE_PRODUCTY_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID_QUERY, {
    variables: { id },
  });

  const [updateProduct, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_PRODUCTY_MUTATION, {
      variables: {
        id,
      },
    });

  const { inputs, handleChange } = useForm(data?.Product);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct({
      variables: {
        id,
        ...inputs,
      },
    });
  };

  const { name, price, description } = inputs;

  const isLoading = loading || updateLoading;
  const isError = error || updateError;

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={isError} />
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="These are the best shoes!"
            value={description}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Update Product</button>
    </Form>
  );
};

export default UpdateProduct;
