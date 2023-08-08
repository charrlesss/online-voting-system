import { ExpressTypes, Messages } from "./../Typing";
import VotersModel from "../Schema/votersSchema";
import bcrypt from "bcryptjs";
import generateAccessToken, {
  generateRefreshToken,
} from "../JWT/generateToken";
import generateCode from "../CustomFunction/generateCode";
import { verifyAccountFromEmail } from "../CustomFunction/sendEmail";

interface CreateAccountArgs {
  fullname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  gender?: string;
}

export default async function createAccount(
  __: any,
  args: CreateAccountArgs,
  { res }: ExpressTypes
): Promise<Messages> {
  try {
    delete args.confirmPassword;
    const { fullname, gender, email, password }: CreateAccountArgs = args;

    const user = await VotersModel.find({});
    const code: string = generateCode();
    const securePassword: string = await bcrypt.hash(password as string, 10);

    if (user.length === 0) {
      const newUser = await new VotersModel({
        fullname,
        gender,
        registered: true,
        securedDetails: [
          {
            email,
            password: securePassword,
            code,
            refreshToken: [],
          },
        ],
      }).save();

      await verifyAccountFromEmail(newUser.securedDetails[0].email, code);
      const REFRESH_TOKEN: string = generateRefreshToken({
        _id: newUser._id,
        email: newUser.securedDetails[0].email,
      });
      const ACCESS_TOKEN: string = generateAccessToken({
        _id: newUser._id,
        email: newUser.securedDetails[0].email,
      });
      const secure = newUser.securedDetails[0];
      const updateUser = {
        ...secure,
        refreshToken: [REFRESH_TOKEN],
      };
      await VotersModel.findOneAndUpdate(
        { _id: newUser._id },
        { securedDetails: [updateUser] }
      );
      res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, {
        httpOnly: true,
        secure: true,
      });
      res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, {
        httpOnly: true,
        secure: true,
      });
      return {
        message: "successfull create account",
        success: true,
      };
    } else {
      const user: any = await VotersModel.find({
        "securedDetails.email": email,
      });

      if (user.length !== 0) {
        return {
          message: "This email is already used!",
          success: false,
        };
      }

      const newUser = await new VotersModel({
        fullname,
        gender,
        registered: true,
        securedDetails: [
          {
            email,
            password: securePassword,
            refreshToken: [],
            code,
          },
        ],
      }).save();
      const REFRESH_TOKEN: string = generateRefreshToken({
        _id: newUser._id,
        email: newUser.securedDetails[0].email,
      });
      const ACCESS_TOKEN = generateAccessToken({
        _id: newUser._id,
        email: newUser.securedDetails[0].email,
      });
      await verifyAccountFromEmail(newUser.securedDetails[0].email, code);

      const secure = newUser.securedDetails[0];
      const updateUser = {
        ...secure,
        refreshToken: [REFRESH_TOKEN],
      };
      await VotersModel.findOneAndUpdate(
        { _id: newUser._id },
        { securedDetails: [updateUser] }
      );
      res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, {
        httpOnly: true,
        secure: true,
      });
      res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, {
        httpOnly: true,
        secure: true,
      });

      return {
        message: "successfull create account",
        success: true,
      };
    }
  } catch (err) {
    return {
      message: `${err}`,
      success: false,
    };
  }
}
