const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SendIn_api_key;

exports.sendEmail = (email, id) => {
  return new Promise((resolve, reject) => {
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    sendSmtpEmail = {
      to: [
        {
          email,
        },
      ],
      templateId: id || 37,
      headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
      },
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log('Mail sent successfully: ' + data);
        resolve(data);
      },
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
};

exports.sendForgetPasswordEmail = async (email, name, link) => {
  return new Promise((resolve, reject) => {
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    sendSmtpEmail = {
      to: [
        {
          email,
          name,
        },
      ],
      templateId: 21,
      params: {
        name,
        link,
      },
      headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
      },
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log('API called successfully. Returned data: ' + data);
        resolve(data);
      },
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
};
