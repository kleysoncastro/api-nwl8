import { Request, Response } from "express";

import { ProfileUserService } from "../services/ProfileUserService";

class GetProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request;

        const service = new ProfileUserService();
        const profileUser = await service.execute(user_id);
        return response.json(profileUser);
    }
}

export { GetProfileUserController };
