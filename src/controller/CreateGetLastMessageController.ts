import { Request, Response } from "express";

import { GetLastMessageService } from "../services/GetLastMessageService";

class CreateGetLastMessageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getLastMesageService = new GetLastMessageService();

        const resultDBMessage = await getLastMesageService.execute();

        return response.json(resultDBMessage);
    }
}

export { CreateGetLastMessageController };
