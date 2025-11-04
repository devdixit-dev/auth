import { Router } from "express";

import { UserProfile, UserRemove, UserUpdate } from "../controllers/user";

const UserRouter = Router();

UserRouter.get('/me', UserProfile);

UserRouter.put('/update/me', UserUpdate);

UserRouter.delete('/remove/me', UserRemove);

export default UserRouter;