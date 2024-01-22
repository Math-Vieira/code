import { Injectable } from '@nestjs/common';
import { SesService } from '@nextnm/nestjs-ses';
import { Resend } from 'resend';
import {
  RESEND_API_KEY,
  RESEND_EMAIL_SENDER
} from '../utils/constants/SERVICES';
// import { SesEmailOptions } from '@nextnm/nestjs-ses';
// import { AWS_EMAIL_SENDER } from '../utils/constants/AWS';

interface ISendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class SendEmailService {
  constructor(private sesService: SesService) {}

  // async sendEmail(payload: ISendEmailPayload) {
  //   const options: SesEmailOptions = {
  //     from: AWS_EMAIL_SENDER,
  //     to: payload.to,
  //     subject: payload.subject,
  //     html: payload.html,
  //     cc: '',
  //     bcc: []
  //   };
  //   await this.sesService.sendEmail(options);
  // }

  async sendEmail(payload: ISendEmailPayload) {
    const resend = new Resend(RESEND_API_KEY);

    resend.emails
      .send({
        from: RESEND_EMAIL_SENDER,
        to: payload.to,
        subject: payload.subject,
        html: payload.html
      })
      .then((response) => {
        if (response.error) {
          console.log('sendEmail error - ', payload.to);
        }
      });
  }
}
