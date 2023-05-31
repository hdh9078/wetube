import express from "express";
import { getEdit, postEdit, logout, see, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController";
import { protectMiddleware, publicMiddleware, avatarupload } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectMiddleware, logout);
userRouter.route("/edit").all(protectMiddleware).get(getEdit).post(avatarupload.single("avatar"), postEdit);
userRouter.get("/github/start", publicMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(protectMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", see);

export default userRouter;