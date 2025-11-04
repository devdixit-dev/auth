import { Router } from "express";

import { validate } from "../middlewares/validator";
import { RegisterSchema, VerifySchema, SignInSchema } from "../validators/auth";

import { AuthLogout, AuthRegister, AuthSignIn, AuthVerify } from "../controllers/auth";
import isAuth from "../middlewares/isAuth";

const AuthRouter = Router();

AuthRouter.post('/register', validate(RegisterSchema), AuthRegister);

AuthRouter.post('/verify', isAuth, validate(VerifySchema), AuthVerify);

AuthRouter.post('/signin', validate(SignInSchema), AuthSignIn);

AuthRouter.post('/logout', isAuth, AuthLogout);

export default AuthRouter;