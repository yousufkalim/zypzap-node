const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SendIn_api_key;

exports.sendEmail = (email) => {
  return new Promise((resolve, reject) => {
    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let identifier = email;

    apiInstance.getContactInfo(identifier).then(
      function (data) {
        let apiInstance1 = new SibApiV3Sdk.EmailCampaignsApi();
        let campaignId = 11;
        let emailTo = new SibApiV3Sdk.SendTestEmail();
        emailTo = {
          emailTo: [email],
        };

        apiInstance1.sendTestEmail(campaignId, emailTo).then(
          function () {
            console.log("Email sent");
            resolve({ success: true, message: "Email sent successfully" });
          },
          function (error) {
            reject(error);
          }
        );
      },
      function (error) {
        let apiInstance = new SibApiV3Sdk.ContactsApi();

        let createContact = new SibApiV3Sdk.CreateContact();

        createContact.email = `${email}`;
        createContact.listIds = [4];

        apiInstance.createContact(createContact).then(
          function (data) {
            let apiInstance1 = new SibApiV3Sdk.EmailCampaignsApi();
            let campaignId = 11;
            let emailTo = new SibApiV3Sdk.SendTestEmail();
            emailTo = {
              emailTo: [email],
            };

            apiInstance1.sendTestEmail(campaignId, emailTo).then(
              function () {
                resolve({ success: true, message: "Email sent successfully" });
              },
              function (error) {
                reject(error);
              }
            );
          },
          function (error) {
            reject(error);
          }
        );
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
        "X-Mailin-custom": "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
      },
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log("API called successfully. Returned data: " + data);
        resolve(data);
      },
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
};
