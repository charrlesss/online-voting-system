import { gql } from "@apollo/client";


const FETCH_USER_DATA = gql`
{
    user{
      fullname
      authenticated
      registered
      verifyCode
      credential
      urlID
      title
      secret
      redirect
      verify
      waitingVerified
      _id
      voted
      gender
    } 
 }
`

const SIGNUP_USERACCOUNT =gql`
    mutation(
        $fullname: String!,
        $gender:String!
        $email: String!,
        $password: String!,
        $confirmPassword: String!
        ) {
        createAccount(fullname: $fullname,gender:$gender, email: $email, password: $password, confirmPassword: $confirmPassword) {
            message
            success
        }
    }
`


const SIGNIN_ADMIN_ACCOUNT =gql`
mutation($email: String!, $password: String!){
  adminsignin(email: $email, password: $password) {
      message
      success
    }
  }
`
const SIGNIN_EMPLOYEE_ACCOUNT =gql`
mutation($email: String!, $password: String!){
  employeesignin(email: $email, password: $password) {
      message
      success
    }
  }
`
const SIGNIN_VOTERS_ACCOUNT =gql`
mutation($email:String!,$password: String!){
  votersignin(email: $email, password: $password) {
      message
      success
    }
  }
`

const FEEDBACK_FORM_USER =gql`
mutation($fullname: String!, $email: String!, $message: String!) {
  contact(fullname: $fullname, email: $email, message: $message) {
    message
    success
  }
}
`

const VERIFY_VOTERS =gql`
mutation($code: String!) {
  verifyVoters(code: $code) {
    message
    success
  }
}
`
const RESEND_CODE =gql`
{ 
   resend {
    message
    success
  }
}
`

const REMOVE_NOTVERIFY_ACCOUNT =gql` {
  removeNotVerifyAccount {
    message
    success
  }
}
`

const UPLOAD_FILE =gql`
  mutation UploadFile($file:Upload!){
    UploadFile(file:$file){
      message
      success
      filename
    }
  }
`

const BASIC_DETIALS = gql`

mutation basicDetails(
  $profile:String
  $birthdate:String
  $municipality:String
  $zipcode: String
  $address: String
  ){
    basicDetails(
      profile:$profile
      birthdate:$birthdate
      municipality:$municipality
      zipcode: $zipcode
      address: $address
      ){
      message
      success
    }

}

`

const AUTHENTICATED = gql`
{
  authenticated{
      message
      success
      urlID
    }

}
`


const LOGOUT = gql`
{
  logout{
      message
      success
    }

}
`

const VERIFY_SECRET  = gql`
mutation($code:String!){
  verifySecret(code:$code){
    message
    success
  }
}
`
const FETCH_USER_DETAILS =gql`{
  fetchBasicDetails{
    profile
    birthdate
    municipality
    zipcode
    address
  }
}
`

const CAPTURED_IMAGE =gql`
mutation($filename: String){
  CaptureImage (filename: $filename) {
    message
    success
  }
}
`

const VERIFY_VOTERS_TO_VALID_VOTERS= gql`
mutation VerifyVotersToValidVoters($verifyVotersIdNumber: String, $verifyVotersPrecinct: String, $verifyVotersFullname: String, $verifyVotersPicture: String, $verifyVotersIdPicture: String) {
  verifyVotersToValidVoters(verifyVotersIDNumber: $verifyVotersIdNumber, verifyVotersPrecinct: $verifyVotersPrecinct, verifyVotersFullname: $verifyVotersFullname, verifyVotersPicture: $verifyVotersPicture, verifyVotersIdPicture: $verifyVotersIdPicture) {
    message
    success
  }
}
`

const FETCH_CANDIDATES =  gql`
{
  fetchCandidates {
    FullName
    position
    profile
    votes
    voterReceiptId
    backout
  }
}
`

const VOTING = gql`
mutation Voting($mayor: [String], $vicemayor: [String], $msp: [String]) {
  voting(mayor: $mayor, vicemayor: $vicemayor, msp: $msp) {
    message
    success
  }
}
`

const FETCH_VOTERS_VOTE =gql`
query Query {
  fetchVote{
    timeAttempt
    mayor
    vicemayor
    msp
    receiptNumber
  } 
 }
`

const UPDATE_UPLOAD_FILE =gql`
  mutation UpdateUploadFile($file:Upload!){
    UpdateUploadFile(file:$file){
      message
      success
      filename
    }
  }
`

const UPDATE_DATA = gql`
mutation Mutation($data: String) {
  UpdateData(data: $data) {
    message
    success
  }
}
`

const FETCH_SECURED_DETAILS =gql`
{
  fetchSecuredDetails {
    email
  }
}

`

const ENTER_PASSWORD = gql`
mutation Mutation($password: String) {
  enterPassword(password: $password) {
    message
    success
  }
}
`

export {
    FETCH_USER_DATA,
    SIGNUP_USERACCOUNT,
    SIGNIN_ADMIN_ACCOUNT,
    SIGNIN_EMPLOYEE_ACCOUNT,
    SIGNIN_VOTERS_ACCOUNT,
    FEEDBACK_FORM_USER,
    VERIFY_VOTERS,
    RESEND_CODE,
    REMOVE_NOTVERIFY_ACCOUNT,
    UPLOAD_FILE,
    BASIC_DETIALS,
    AUTHENTICATED,
    LOGOUT,
    VERIFY_SECRET,
    FETCH_USER_DETAILS,
    CAPTURED_IMAGE,
    VERIFY_VOTERS_TO_VALID_VOTERS,
    FETCH_CANDIDATES,
    VOTING,
    FETCH_VOTERS_VOTE,
    UPDATE_UPLOAD_FILE,
    UPDATE_DATA,
    FETCH_SECURED_DETAILS,
    ENTER_PASSWORD
}