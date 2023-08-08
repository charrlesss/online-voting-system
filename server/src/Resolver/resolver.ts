import { ExpressTypes } from "../Typing";
import createAccount from "./../AuthUser/createAccount";
import VotersModel from "../Schema/votersSchema";
import Admin from "../Schema/adminSchema";
import Employee from "../Schema/employeeSchema";
import votersignin from "../AuthUser/votersignin";
import employeesignin from "../AuthUser/employeesignin";
import adminsignin from "../AuthUser/adminsignin";
import contact from "../Component/Contact";
import verifyVoters from "../Component/VerifyVoters";
import resend from "../Component/ResendCode";
import removeNotVerifyAccount from "../Component/RemoveNotVerifyAccount";
import { GraphQLUpload } from "graphql-upload";
import UploadFile from "../Component/Uploadfile";
import basicDetails from "../Component/BasicDetails";
import authenticated from "../Component/Authenticated";
import logout from "../Component/Logout";
import verifySecret from "../Component/VerifySecret";
import fetchBasicDetails from "../Component/GetBasicDetails";
import CaptureImage from "../Component/CaptureImage";
import verifyVotersToValidVoters from "../Component/VerifyVotersToValidVoters";
import fetchCandidates from "../Component/fetchCandidates";
import voting from "../Component/Voting";
import fetchVote from "../Component/FetchVote";
import UpdateUploadFile from '../Component/updateFileUpload'
import UpdateData from '../Component/UpdateData'
import fetchSecuredDetails from '../Component/fetchSecuredDetails'
import enterPassword  from '../Component/EnterPassword'
interface User {
  gender: string;
  fullname: string;
  authenticated: boolean;
  registered: boolean;
  verifyCode: boolean;
  credential: boolean;
  urlID: string;
  title: string;
  secret: boolean;
  redirect: boolean;
  verify: boolean;
  waitingVerified: boolean;
  _id: any;
  voted: boolean;
}

const defaultValue: User = {
  gender: "",
  authenticated: false,
  credential: false,
  registered: false,
  fullname: "",
  verifyCode: false,
  secret: false,
  redirect: false,
  verify: false,
  waitingVerified: false,
  urlID: "",
  title: "",
  _id: "",
  voted: false,
};

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    user: async (_: any, __: any, { req }: ExpressTypes): Promise<User[]> => {
      const userFound: User[] = [
        (await VotersModel.findById(req.userId)) ||
          (await Admin.findById(req.userId)) ||
          (await Employee.findById(req.userId)),
      ] as User[];
      if (req.userId) {
        const myArray: any = [...userFound];
        if (userFound[0].waitingVerified === undefined) {
          return [{ ...myArray[0]._doc, waitingVerified: false }];
        }
        return userFound;
      }
      return [defaultValue] as User[];
    },
    resend,
    removeNotVerifyAccount,
    authenticated,
    fetchBasicDetails,
    logout,
    fetchCandidates,
    fetchVote,
    fetchSecuredDetails,
  },
  Mutation: {
    createAccount,
    votersignin,
    employeesignin,
    adminsignin,
    contact,
    verifyVoters,
    UploadFile,
    basicDetails,
    verifySecret,
    CaptureImage,
    verifyVotersToValidVoters,
    voting,
    UpdateUploadFile,
    UpdateData,
    enterPassword
  },
};

export default resolvers;
