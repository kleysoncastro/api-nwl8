import { Request, Response } from "express";

import { AuthenticateUserService } from "../services/AuthenticateUserService";

class CreateMessageController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { code } = request.body;

            const service = new AuthenticateUserService();
            const result = await service.execute(code);
            return response.json(result);
        } catch (error) {
            return response.status(401).json(error.message);
        }
    }
}

export { CreateMessageController };
