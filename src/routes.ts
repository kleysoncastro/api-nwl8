import { Router } from "express";

import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateGetLastMessageController } from "./controller/CreateGetLastMessageController";
import { CreateMessageController } from "./controller/CreateMessageController";
import { GetProfileUserController } from "./controller/GetProfileUserController";
import { ensureAuthenticate } from "./middleware/EnsureAuthenticate";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post(
    "/message",
    ensureAuthenticate,

    new CreateMessageController().handle
);
router.get("/message/last3", new CreateGetLastMessageController().handle);

router.get(
    "/profile",
    ensureAuthenticate,
    new GetProfileUserController().handle
);

export { router };
