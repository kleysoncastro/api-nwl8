import axios from "axios";
import { response } from "express";

interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    id: string;
    avatar_url: string;
    login: string;
    name: string;
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "http://github.com/login/oauth/access_token";

        const getAccessTokenUser = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENTE_ID,
                client_secret: process.env.GITHUB_CLIENTE_SECRET,
                code,
            },
            headers: {
                Accept: "application/json",
            },
        });

        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${getAccessTokenUser.data.access_token}`
            }
        })

        return response.data;
    }
}

export { AuthenticateUserService };
