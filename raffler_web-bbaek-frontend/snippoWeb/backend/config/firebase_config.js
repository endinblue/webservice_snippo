require('dotenv').config();


var config ={
    "type": "service_account",
    "project_id": "fcmtest-74b28",
    "private_key_id": process.env.firebase_private_key_id,
    "private_key": process.env.firebase_private_key,
    "client_email": "firebase-adminsdk-qaosl@fcmtest-74b28.iam.gserviceaccount.com",
    "client_id": "109304211280999973118",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",


}

module.exports={config};