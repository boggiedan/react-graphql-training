import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm();

  const [signup, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signup();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <Error error={error} />
      {data?.sendUserPasswordResetLink === null && (
        <p>Success! Check your email for a link!</p>
      )}
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}
