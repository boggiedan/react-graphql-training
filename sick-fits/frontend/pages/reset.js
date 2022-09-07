import Link from 'next/link';
import Reset from '../components/Reset';

const ResetPage = ({ query = {} }) => {
  const { token } = query;

  if (!token) {
    return (
      <div>
        <p>Sorry, you must supply a token</p>
        <Link href="/signin">Request a password reset</Link>
      </div>
    );
  }

  return (
    <div>
      <p>Reset your password {token}</p>
      <Reset token={token} />
    </div>
  );
};

export default ResetPage;
