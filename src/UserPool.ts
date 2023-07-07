import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: "eu-north-1_5UjnEwFaF",
    ClientId: "1gtmkc8smk57dho21flnfsbqrb"
}



// GHG Vladi 1
// UserPoolId: "eu-north-1_OTQbHLqTS",
// ClientId: "7p56efobqug1vg5c4vqae5gmqo"

// GHG Vladi 2
// UserPoolId: "eu-north-1_5UjnEwFaF",
// ClientId: "1gtmkc8smk57dho21flnfsbqrb"

export default new CognitoUserPool(poolData)