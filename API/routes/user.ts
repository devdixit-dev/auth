import { Router } from "express";

import { UserProfile, UserRemove, UserUpdate } from "../controllers/user";

const UserRouter = Router();

UserRouter.get('/me', UserProfile);

UserRouter.get('update/me', UserUpdate);

UserRouter.get('remove/me', UserRemove);

export default UserRouter;