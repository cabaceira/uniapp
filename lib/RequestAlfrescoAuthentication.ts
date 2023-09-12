import {
    IHttp,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export  async function getAuthenticationTicket(
    http: IHttp,
    read: IRead,
    username: string,
    password: string
): Promise<any> {
   console.log("IN getAuthenticationTicket");
    /* const authApi = {
            hostname: 'localhost',
            port: 8080,
            path: '/alfresco/api/-default-/public/authentication/versions/1/tickets',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        }*/
    var headers = {
        "Content-Type": "application/json"
    };
    const payload = {
        userId: username,
        password: password
    };
    console.log(`called UniApp: authentication/versions/1/tickets`);
    return http.post("http://localhost:8080/alfresco/api/-default-/public/authentication/versions/1/tickets", {
        headers: headers,
        data: payload,
    })
    .then((ok) => {
        var result = {
            success: true,
            content: ok.data,
            user: username
        };
        if ("error" in ok.data) {
            result["success"] = false;
            // this is necessary for the link to be rendered correctly
            result["content"]["error"]["message"] = result["content"][ "error" ]["message"];
        }
        console.log( `Got new Authentication request`, result, `for the payload`, payload);
        return result;
    })
    .catch((error) => {
        console.log(`ERROR : Error while getting new authentication `,error);
        return { success: false };
    });

 }
