import axios from "axios";

interface IAccessTokenResponse {
    access_token: string;
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "http://github.com/login/oauth/access_token";

        const response = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENTE_ID,
                client_secret: process.env.GITHUB_CLIENTE_SECRET,
                code,
            },
            headers: {
                Accept: "application/json",
            },
        });
        return response.data;
    }
}

export { AuthenticateUserService };
