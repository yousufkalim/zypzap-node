var nodemailer = require("nodemailer");
//   SMTP method
const sender_mail = process.env.MAILER_EMAIL;
const password = process.env.MAILER_PASS;

exports.sendEmail = (email) => {
  return new Promise((resolve, reject) => {
    // Sender mail server config
    var transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 587,
      secure: false,
      auth: {
        user: sender_mail,
        pass: password,
      },
    });

    // Send email options
    var mailOptions = {
      from: `ZypZap <${sender_mail}>`,
      to: email,
      subject: "Merci pour votre pré-inscription ! - Bienvenue chez ZypZap !",
      html: WelcomMsg(email),
    };

    // Sending email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // Error
        reject(error);
      } else {
        resolve({ success: true, message: "Email sent successfully" });
      }
    });
  });
};

///   templete send to customer
const WelcomMsg = (email) => {
  const date = new Date();
  function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  }
  var day = getDayName(date, "fr");
  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "Mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato&family=Maven+Pro:wght@400;800&family=Mulish&family=Poppins:wght@500&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/style.css" />
      <title>Mail Confirmation</title>
      <style>
        @media screen and (max-width: 800px) {
          .mail-confirm-container {
            width: 80% !important;
            padding: 0px 0 !important;
          }
          .mail-H1 {
            font-size: 16px !important;
          }
          .mail-p {
            font-size: 16px !important;
          }
          .mail-logo-div-p {
            padding: 0 !important;
          }
          .mail-logo-div {
            padding: 10px 0 !important;
          }
          .mail-contents {
            padding: 0 !important;
          }
          .mail-contentsP1 {
            padding: 0 !important;
            font-size: 20px !important;
          }
          .mail-Bg-P {
            padding: 10px 0 !important;
          }
        }
      </style>
    </head>
    <body style="font-family: Lato, sans-serif; margin: 0">
      <div style="width: 100%" class="mail-confirm;">
        <div
          style="width: 90%; margin: auto; padding: 50px 0"
          class="mail-confirm-container"
        >
          <div class="mail-centerDiv">
            <!-- ---------------------------- mail-logo-div start ---------------------------- -->
            <div
              style="text-align: center; padding: 50px 0"
              class="mail-logo-div"
            >
              <a href="">
                <p
                  style="
                    color: gray;
                    font-size: 18px;
                    font-weight: 400;
                    margin-bottom: 50px;
                  "
                  class="mail-logo-div-p"
                >
                  Afficher dans le navigateur
                </p>
              </a>
              <img
                style="width: 90%"
                src="https://pass-to-trip.s3.eu-west-3.amazonaws.com/ZypzapLogo.jpg"
                alt=""
                class="mail-zypzap-logo"
              />
            </div>
            <!-- ---------------------------- mail-logo-div end ---------------------------- -->
            <!-- ------------------------ mail-heading-content start------------------------- -->
            <div
              style="text-align: center; padding: 50px 0"
              class="mail-contents"
            >
              <p
                style="font-size: 25px; opacity: 0.9; padding: 0 50px 30px 50px"
                class="mail-contentsP1"
              >
                Hello !
              </p>
              <p
                style="font-size: 25px; opacity: 0.9; padding: 0 50px 30px 50px"
                class="mail-contentsP1"
              >
                Votre inscription à la plateforme ZypZap a bien été prise en
                compte. Nous avons hâte de construire cet univers à vos côtés !
              </p>
              <p
                style="font-size: 25px; opacity: 0.9; padding: 0 50px 30px 50px"
                class="mail-contentsP1"
              >
                Nous vous tiendrons régulièrement informé des grands rendez-vous
                de la plateforme (phases de test, lancement, événements…) mais
                n’hésitez pas à nous faire part de toutes vos suggestions
                d’amélioration à n’importe quel moment !
              </p>
              <p
                style="font-size: 25px; opacity: 0.9; padding: 0 50px 30px 50px"
                class="mail-contentsP1"
              >
                À très vite.
              </p>
            </div>
            <!-- ------------------------ mail-heading-content end------------------------- -->
            <div style="text-align: center" class="mail-Bg-container">
              <img style="width: 90%" src="https://pass-to-trip.s3.eu-west-3.amazonaws.com/signature%20zypzap%20globale.jpeg" alt="" class="mailBg" />
              <p
                style="padding-top: 30px; padding-bottom: 50px; font-size: 20px; color: gray;"
                class="mail-Bg-P"
              >
                Si vous souhaitez vous désinscrire de notre newsletter, cliquez
                <span"><a  style="color: blue"  href="" > ici</a></span>
              </p>
              <div class="mail-footerLogo">
                <a href="https://discord.gg/qkv5jufE">
                  <button class="mailFT-Logo" style="background-color: blue;
                  cursor: pointer;
                  border: none;
                  color: #fff;
                  border-radius: 20px;
                  padding: 10px 50px;
                  font-size: 20px;" >Rejoignez le Discord !</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>`;
};
// module.exports = (email) => {
//   transporter;
// };
