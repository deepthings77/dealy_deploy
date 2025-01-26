import admin from "firebase-admin";
import dotenv from "dotenv";



dotenv.config();
const serviceAccount = {
    "type": "service_account",
    "project_id": "dealy-b0d0f",
    "private_key_id": "7df1d6a1610c459d9e46a0e927d7d119f98ae905",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDU8jU/Do/mMMLE\n9kafaPcaEWbnfo5eEtGpjTGWN9CkbBbH8QuHXo1flntGoAxYC+cxiEhnkppwlT2t\nKApX4Jq/4U4EMzBM77oZ2q+IUdW77Kqa+nLOKza91a3ePvKBvdxjwFaENOWOnRO2\nAz2fFkOJECLPRxnRwPQQ6/AzEXFFAgpBhGE3QXOMmGhcBepQuSMOcUPKG/n7kttv\nVAu80gMgTEDynek8f6BygM1oWNhVsH+zkljriCeoooBBKBdMOWyveQnqfl3f3oUI\nByr3Xue+N6UDTNTTUfIjRxdeqcdQJSDOf0I99FIGOH805Xmc47HfJCo51WDTI1gf\ncq7TJT4lAgMBAAECggEAG5Z3fIBb9zQI/7ByTNOx87Aed05Hjnt8qy0uJ+p6Ptr8\nBpI9bp+6zA/4T5mLj9qW7K1dyAFPvdcv4t+Fm4XvNn2veE7TapxCLXhN9mi3un16\nStK4jeo+UNC+kkTwcQuSYl/4NW+O7+98rr9zu8kMHdU31Ue+WhTX6dtPRqZzWL+i\n4KBqb4WBFY/qL1a2J1bCZ3wXbivAydgsFlhVt7KTkriuqcyyvhzbve7zY6BnRLui\n7fM5XUm9iSst2IbFxHSSIFtrGHwjFLf++XVEWr0PrUofFp/jsFttXGzR+lknR3FQ\n52YBYB2SvX8p2mnIhZ6tIV2WGOLQ2t8GGtJjCJL/bwKBgQDxze+jbF2RZ7T0qggf\n/86Fq8jDzXShyYIkNFbfIkmILb2N1Lvzm4aBWFM3QDNUFDE5oyLcWmOe3OeVMaTP\nIHnxYNmk9aTdxar5lKTthA6EyF0pwjbhbyWIv13v3ikI9U94+/lb7GAglYA3CUgc\nDtx5lS7pd5lOH1iXbHFkBsAiNwKBgQDhco/mdBnxCW+K7y/IDZ8MVcDo90vZ+qX3\nivAGv2Y8OUULHS2jWfqO3U/QTSYEbNPX43mnNzaR9u44ZIGCWyp0yBIm3NeVdC+L\nOdkDCDQylkeeMTY0B0I0W8eNtb8ITFBYlAHIhoa0amfyu/XNIf1toBgIniVoNLUu\nH4UeRBwkgwKBgBMwhbERe4d7lHfKOqTXdztSe7dWSchBJqva334LyYweHSnxVQ0r\nLYx8RvZeiPRGOfXaBX05SyijXVmQvASYDjViu0MFH5VeB4iRDFmxHjnZcNNMj3Bq\nkq78iObtWZJVbX4reQmbg7FyS9+SQ/++Ci838KYkkK0Lfctels0aYAsXAoGBAIHA\n5M9XLQMMUjVdWlvCczKvPDsY8YAAgXsKbQEFMbshnvo5jeXBSLLm7yPM8z+Cvx42\n3vJ9lZvGye6M8fjrrXDPIZtaaX2sBB0Way8SjrA6y/dhDXg+YT0vQZfu7YbCHVAN\nx0T5IBhAUZlj0qGAmZJ5nLuBAbiK9WgZXg1AWA4vAoGATI8RvfU6k6h+ekF1Bc2I\n/cjLS8pFWpgzOvUjQON2S3DKtcrDI42+EGPC3AbYm8R/1t1OQYngJr5s5wWPAjKP\ne21T2DunTt3GEKbdqbMmvnMFwb55vieJsNxcvZ1jtiH1eGYeWuvZ6k2tLfK6q4wZ\nwtmBdMczIF1PbbeqlnXzTlQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@dealy-b0d0f.iam.gserviceaccount.com",
    "client_id": "114357847800700347099",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40dealy-b0d0f.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"

};



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
