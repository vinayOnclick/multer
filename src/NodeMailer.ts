import * as nodeMailer from "nodemailer";
import {google} from "googleapis"
import config from "./middlewares/configVinay"
const oAuth2= google.auth.OAuth2
const OAuth2_client= new oAuth2(config.CLIENTID,config.CLIENTSECRET)
OAuth2_client.setCredentials({refresh_token:config.REFRESH_TOKEN})
const accessToken=OAuth2_client.getAccessToken()
  const mail = nodeMailer.createTransport({
    service: "gmail",
     auth: {
      type:"OAuth2",
      user:config.USER,
      clientId:config.CLIENTID,
      clientSecret:config.CLIENTSECRET,
      refreshToken:config.REFRESH_TOKEN,
      accessToken:accessToken
    },
  }); 
  console.log(config.USER,"SENDER HERE")
  export default mail;
