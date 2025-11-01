import { Router } from "express";

import { validate } from "../middlewares/validator";
import { RegisterSchema, VerifySchema, SignInSchema } from "../validators/user";

import { AuthLogout, AuthRegister, AuthSignIn, AuthVerify } from "../controllers/auth";

const AuthRouter = Router();

AuthRouter.get('/register', validate(RegisterSchema), AuthRegister);

AuthRouter.post('/verify', validate(VerifySchema), AuthVerify);

AuthRouter.post('/signin', validate(SignInSchema), AuthSignIn);

AuthRouter.post('/logout', AuthLogout);

export default AuthRouter;