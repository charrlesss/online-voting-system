import { gql } from "apollo-server-express";

const typeDefs = gql`
scalar Upload

type Details{
  profile:String!
  birthdate:String!
  municipality:String!
  zipcode: String!
  address: String!
}

    type User {
      gender:String!
      fullname: String!
      authenticated:Boolean!
      registered:Boolean!
      verifyCode:Boolean!
      credential:Boolean!
      secret:Boolean!
      verify:Boolean!
      redirect:Boolean!
      urlID:String!
      title:String!
      waitingVerified:Boolean!
      _id:ID!
      voted:Boolean!
    }

   type Messages {
    message:String!
    success:Boolean!
  }

  type FileUpload {
    message:String!
    success:Boolean!
    filename:String!
  }
  type UpdateUploadFile {
    message:String!
    success:Boolean!
    filename:String!
  }

  type Authenticated{
    message:String!
    success:Boolean!
    urlID:String!
  }


  type verifyVotersToValidVoters{
    verifyVotersIDNumber:String
    verifyVotersPrecinct:String
    verifyVotersFullname:String
    verifyVotersPicture:String
    verifyVotersIdPicture:String
  }

  type FetchCandidates{
    FullName:String
    position:String
    profile:String
    votes:Int
    voterReceiptId:[String!]
    backout:Boolean
  }



type FetchVote{
  timeAttempt:String
  mayor:[String]
  vicemayor:[String]
  msp:[String]
  receiptNumber:String
}

  type SecuredDetails{
    email:String
  }
  type Query {
    user:[User]
    resend:Messages
    removeNotVerifyAccount:Messages
    authenticated:Authenticated
    logout:Messages
    fetchBasicDetails:[Details],
    fetchCandidates:[FetchCandidates]
    fetchVote:[FetchVote]
    fetchSecuredDetails:[SecuredDetails]
  }


  type Mutation {
    createAccount(
    fullname:String!
    gender:String!
    email:String!
    password:String!
    confirmPassword:String!
    ):Messages

    votersignin(
      email:String!
      password:String!
    ):Messages

    employeesignin(
      email:String!
      password:String!
    ):Messages

    adminsignin(
      email:String!
      password:String!
    ):Messages

    contact(
      fullname:String!
      email:String!
      message:String!
    ):Messages

    verifyVoters(code:String!):Messages
    UploadFile(file:Upload!):FileUpload

    basicDetails(
      profile:String
      birthdate:String
      municipality:String
      zipcode: String
      address: String
    ):Messages 
    verifySecret(code:String!):Messages

    CaptureImage(filename:String):Messages
    
    verifyVotersToValidVoters(
      verifyVotersIDNumber:String
      verifyVotersPrecinct:String
      verifyVotersFullname:String
      verifyVotersPicture:String
      verifyVotersIdPicture:String
    ):Messages
    
    voting(
      mayor:[String] 
      vicemayor:[String]
      msp:[String]
    ):Messages
    UpdateUploadFile(file:Upload!):UpdateUploadFile
    UpdateData(data:String):Messages
    enterPassword(password:String):Messages
  }
`;

export default typeDefs;
