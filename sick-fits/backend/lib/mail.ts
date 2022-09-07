import 'dotenv';
import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const makeANiceEmail = (text: string): string => `
    <div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
    ">
        <h2>Hello There!</h2>
        <p>${text}</p>
        <p>😘, Wes Bos</p>
    </div>
`;

export interface Envelope {
  from: string;
  to?: string[] | null;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export const sendPasswordResetEmail = async (
  resetToken: string,
  to: string
): Promise<void> => {
  // Email the user a token
  const info = (await transport.sendMail({
    to,
    from: 'bogdan@sukmanov.com',
    subject: 'Your Password Reset Token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to Reset</a>
        `),
  })) as MailResponse;
  console.log(info);

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
};
