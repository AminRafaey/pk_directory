/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */

import axios from 'axios';

class PostmarkService {
  /**
   * @description - send an .
   * @param templateModel - Template model.
   * @param email - Recipient Email.
   */

  async sendSchoolClaimEmailOtp(templateModel, email) {
    axios
      .post(
        'https://api.postmarkapp.com/email/withTemplate',
        {
          TemplateId: 34347289,
          TemplateModel: {
            ...templateModel,
          },
          From: 'apps@dojo.plus',
          To: email,
        },
        {
          headers: {
            Accept: 'application/json',
            'X-Postmark-Server-Token': process.env.POSTMARK_KEY,
            
          },
        },
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error.response.data));
  }
}

export default new PostmarkService();
