import axios from "axios";
import { sign } from "jsonwebtoken";

import prismaClient from "../prisma";

interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    id: number;
    avatar_url: string;
    login: string;
    name: string;
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "http://github.com/login/oauth/access_token";

        const getAccessTokenUser = await axios.post<IAccessTokenResponse>(
            url,
            null,
            {
                params: {
                    client_id: process.env.GITHUB_CLIENTE_ID,
                    client_secret: process.env.GITHUB_CLIENTE_SECRET,
                    code,
                },
                headers: {
                    Accept: "application/json",
                },
            }
        );

        const response = await axios.get<IUserResponse>(
            "https://api.github.com/user",
            {
                headers: {
                    authorization: `Bearer ${getAccessTokenUser.data.access_token}`,
                },
            }
        );
        const { id, login, avatar_url, name } = response.data;

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id,
            },
        });

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name,
                },
            });
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id,
                },
            },
            process.env.HASH_SHA1_JWT,
            {
                subject: user.id,
                expiresIn: "1d",
            }
        );

        return { token, user };
    }
}

export { AuthenticateUserService };
