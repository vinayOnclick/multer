import { Router } from "express";
import userController from "../../src/user/controller";
import { GlobalMiddleWare } from "../../middlewares/GlobalMiddleWares";
import multer from "../../middlewares/multer";

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.postRoutes();
    this.getRoutes();

    this.patchRoutes();
  }

  postRoutes() {
    this.router.post("/register", userController.register);
    this.router.post("/login", userController.login);
    this.router.post(
      "/updateImage",
      GlobalMiddleWare.authenticate,
      multer,
      userController.upload
    );

    this.router.post(
      "/sendEmail",
      GlobalMiddleWare.authenticate,
      userController.sendEmail
    );
  }

  patchRoutes() {
    this.router.patch(
      "/update/:id",
      GlobalMiddleWare.authenticate,
      userController.updateUser
    );
  }
  getRoutes() {
    this.router.get(
      "/getAll",
      GlobalMiddleWare.authenticate,
      userController.findUsers
    );
  }
}
export default new UserRouter().router;
