import { environment } from '../../environments/environment.prod';

console.log(environment.APIUrl);

let baseUrl:string = environment.APIUrl;

export const APIUrls:any = {
    LOGIN: `${baseUrl}/oauth/token`,
    SELF: `${baseUrl}/users/self`,
    GEN_INS: `${baseUrl}/tests/general-instructions`,
    TEST_INS: `${baseUrl}/tests/test-instructions`,
}