import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IUserIdDTO {
    sub: string;
}
function ensureAuthenticate(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToke = request.headers.authorization;

    if (!authToke) {
        return response.status(401).json({ error: "token Invalid" });
    }
    const [, token] = authToke.split(" ");

    try {
        const { sub } = verify(token, process.env.HASH_SHA1_JWT) as IUserIdDTO;

        request.user_id = sub;

        return next();
    } catch (error) {
        return response.status(401).json({ error: "Token expired or invalid" });
    }
}

export { ensureAuthenticate };
