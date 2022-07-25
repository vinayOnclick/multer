import User from "./model";
import * as Bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";
import Test from "./Testmodel";
import mail from "../../NodeMailer";

export default class userController {
  static async register(req: any, res: any, next: any) {
    const { firstName, lastName, email, password, age, address, phone } =
      req.body;
    console.log(req.body);
    try {
      const hash = await Bcrypt.hash(password, 10);
      const data = {
        email: email,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        age: age,
        address: address,
        phone: phone,
      };
      const add = await new User(data).save();
return res.status(200).json({
        message: "REGISTRATION SUCCESSFULL",
        Status_code: 200,
        data: add,
      });
    } catch (error) {
      return res.status(200).json({
        message: "REGISTRATION FAILED",
       });
    }
  }

  static async login(req, res) {
    try {
      let user = await User.findOne({ email: req.body.email });
  
      if (user) {
        let result = await Bcrypt.compare(req.body.password, user.password);
        if (!result) {
          console.log("password not matching");
          return res.status(401).json({
            msg: "password matching fail",
          });
        } else {
          const token = Jwt.sign(
            {
              email: user.email,
              _id: user._id,
            },
            process.env.SECRET_KEY
          );
          console.log(token);

          return res.json({
            message: "LOGIN SUCCESS",
            Token: token,
          });
        }
      } else {
        
        return res.status(401).json({
          msg: "email not matched",
        });
      }
    } catch (error) {
      return res.json({
        message: "LOGIN FAILED",
      });
    }
  }

  static async updateUser(req: any, res: any) {
    try {
      const _id = req.params.id;
      const { firstName, lastName, email, age, address, phone } = req.body;
      let user = await User.findOne({ _id: req.user });

      if (!user) {
        res.json({ message: "user not found" });
      } else {
        const data = await User.updateOne({ _id: _id }, { ...req.body });
        console.log(data, "vinay bawa");
        return res.json({
          message: "Update SUCCESS",
          data: data,
        });
      }
    } catch (error) {
      return res.json({
        message: "Update FAILED",
        data: error,
      });
    }
  }

  static async findUsers(req: any, res: any) {
    try {
      let user = await User.findOne({ _id: req.user });

      if (!user) {
        res.json({ message: "users not found" });
      } else {
        res.json({
          message: "Update API SUCCESS",
          data: user,
        });
      }
    } catch (error) {
      return res.json({
        message: "Update API FAILED",
        data: error,
      });
    }
  }

  static async sendEmail(req, res) {
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (!user) {
        res.json({ message: "users not found" });
      } else {
        const sent = await mail.sendMail({
          from: user.email,
          to: user.email,
          subject: "Its a SMTP message from vinay Sharma",
          html: "hello folks",
        });

        return res.json({
          message: "SUCCESS",
          data: sent,
        });
      }
    } catch (error) {
      return res.json({
        message: "FAILED",
        data: error,
      });
    }
  }

  static async upload(req, res) {
    try {
      const image = new Test({
        image: {
          data: req.file.fieldName,
          contentType: "image/jpg",
        },
      });
      image.save();
      return res.json({
        status: 200,
        message: "Sucess",
        data: image,
      });
    } catch (error) {
      return res.send("failed");
    }
  }
}
