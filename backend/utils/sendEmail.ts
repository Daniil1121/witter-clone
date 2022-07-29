import mailer from "../core/mailer";
import { SentMessageInfo } from "nodemailer/lib/sendmail-transport";

export interface IDataMailerProps {
  fromEmail: string;
  toEMail: string;
  subject: string;
  html: string;
}

export const sendEmail = (
  { fromEmail, toEMail, subject, html }: IDataMailerProps,
  callback?: (err: Error | null, info: SentMessageInfo) => void
): void => {
  mailer.sendMail({
    from: fromEmail,
    to: toEMail,
    subject: subject,
    html: html,
  });
};
