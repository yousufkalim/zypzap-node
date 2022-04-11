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
