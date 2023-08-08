import { useQuery , useMutation  ,MutationFunction  ,useLazyQuery } from '@apollo/client'
import {
     FETCH_USER_DATA,
     SIGNUP_USERACCOUNT,
     SIGNIN_ADMIN_ACCOUNT,
    SIGNIN_EMPLOYEE_ACCOUNT,
    SIGNIN_VOTERS_ACCOUNT,
     FEEDBACK_FORM_USER,
     VERIFY_VOTERS ,
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
} from './query'

interface QueryObject{
    data?:any,
    loading:any,
    error:any
}

interface MutationObject{
    mutate:MutationFunction,
    data?:any,
    loading:any,
    error:any
}

const useFetchUserData = ():QueryObject=>{
    const {data , loading ,error}  = useQuery(FETCH_USER_DATA)
    return{
        data,
        loading,
        error
    }
}

const useSignupUser = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(SIGNUP_USERACCOUNT ,{
      refetchQueries:[{query:FETCH_USER_DATA}],
       onCompleted:(data)=>{
           window.localStorage.removeItem('disable')
           window.localStorage.setItem('timerStart','30')
           window.localStorage.setItem('timeend','30')
           if(data.createAccount.success){
                 window.location.href ='/'
           }
       }
    })
    return{
        mutate,
        data,
        loading,
        error
    }
}

const useSigninAdminAccount = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(SIGNIN_ADMIN_ACCOUNT,{
        refetchQueries:[{query:FETCH_USER_DATA}],
        onCompleted:(res):any=>{
            window.localStorage.setItem('timerStart','30')
            window.localStorage.setItem('timeend','30')
            window.localStorage.setItem('disable','')

            if(res.adminsignin.success){
                setTimeout(()=>{
                    window.location.href = '/'
               },100)
            }
        }
    })
    return{
        mutate,
        data,
        loading,
        error
    }
}

const useSigninEmployeeAccount = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(SIGNIN_EMPLOYEE_ACCOUNT,{
        refetchQueries:[{query:FETCH_USER_DATA}],
        onCompleted:(res):any=>{
            window.localStorage.setItem('timerStart','30')
            window.localStorage.setItem('timeend','30')
            window.localStorage.setItem('disable','')
        
            if(res.employeesignin.success){
                setTimeout(()=>{
                    window.location.href = '/'
               },100)     
            }
        }
    })
    return{
        mutate,
        data,
        loading,
        error
    }
}

const useSigninVoterAccount = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(SIGNIN_VOTERS_ACCOUNT,{
        refetchQueries:[{query:FETCH_USER_DATA}],
        onCompleted:(res):any=>{
            if(res.votersignin.success ){
                     window.location.href = '/'
            }
        }
    })
    return{
        mutate,
        data,
        loading,
        error
    }
}

const useFeedBackUser = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(FEEDBACK_FORM_USER)
    return{
        mutate,
        data,
        loading,
        error
    }
}

const useVerifyVoters = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(VERIFY_VOTERS ,{
        refetchQueries:[{query:FETCH_USER_DATA}],
        onCompleted:(data)=>{
            if(data.verifyVoters.success){
                  window.location.href ='/'
            }
        }
    })

    return{
        mutate,
        data,
        loading,
        error
    }
}

const useResendCode = ():QueryObject=>{
    const {data , loading ,error}  = useQuery(RESEND_CODE ,{
        onCompleted:(res):any=>{
            window.localStorage.setItem('timerStart','30')
            window.localStorage.setItem('timeend','30')
            window.localStorage.setItem('disable','')
            if(res.resend.success){
                window.location.href = '/'
            }
        }
    })
    return{
        data,
        loading,
        error
    }
}


const useRemoveNotVerifyAccount = ():QueryObject=>{
    const {data , loading ,error}  = useQuery(REMOVE_NOTVERIFY_ACCOUNT ,{
        onCompleted:(res):any=>{
            if(res.removeNotVerifyAccount.success){
                window.localStorage.removeItem('resendTimes')
                setTimeout(()=>{
                    window.location.href = '/'
                },5000)
            }
        }
    })
    return{
        data,
        loading,
        error
    }
}


const useUploadFile = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(UPLOAD_FILE ,{
        onCompleted:(res):any=>{
            if(res.UploadFile.success){
                window.sessionStorage.setItem('file',`${res.UploadFile.filename}`)
            }
        }
    })
    return{
        mutate,
        data,
        loading,
        error
    }
}


const useBasisDeatails = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(BASIC_DETIALS ,{
        onCompleted:(res:any):void=>{
            console.log(res)
            window.localStorage.removeItem('submit')
            if(res.basicDetails.success){
                 window.location.href ='/'
            }
        }
    })
    return{
        mutate,
        data,
        loading,
        error
    }
}

const useAuthenticated = ():QueryObject=>{
    const {data , loading ,error}  = useQuery(AUTHENTICATED ,{
        onCompleted:(res)=>{
            window.sessionStorage.setItem('asdasdasd' ,'asdasd')
            if(res.authenticated.success){
                window.location.href=`/s/${res.authenticated.urlID}`
            }
        }
    })

    return{
        data,
        loading,
        error
    }
}

const useLogout = ():any=>{
    const [logout,{data , loading ,error}]  = useLazyQuery(LOGOUT ,{
        onCompleted:(res)=>{
            if(res.logout.success){
                window.localStorage.clear()
                window.sessionStorage.clear()
                window.location.href = '/'
            }
        }
    })
    return{
        logout,
        data,
        loading,
        error
    }
}

const useVerifySecret = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(VERIFY_SECRET ,{
        onCompleted:(res):any=>{
            if(res.verifySecret.success){
                window.location.href ='/'
            }
        }
    })
    return{
        mutate,
        data,
        loading,
        error
    }
}


const useFetchUserDetails = ():QueryObject=>{
    const {data , loading ,error}  = useQuery(FETCH_USER_DETAILS)

    return{
        data,
        loading,
        error
    }
}

const useCapturedImage = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(CAPTURED_IMAGE)
    return{
        mutate,
        data,
        loading,
        error
    }
}

const useVerifyVotersToValidVoters = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(VERIFY_VOTERS_TO_VALID_VOTERS )
    return{
        mutate,
        data,
        loading,
        error
    }
}


const useFetchCandidates = ():QueryObject=>{
    const {data , loading ,error}  = useQuery(FETCH_CANDIDATES)
    console.log(data)
    return{
        data,
        loading,
        error
    }
}


const useVoting = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(VOTING)
    return{
        mutate,
        data,
        loading,
        error
    }
}


const useFetchVotersVote = ():QueryObject=>{
    const {data , loading ,error}  = useQuery(FETCH_VOTERS_VOTE)

    return{
        data,
        loading,
        error
    }
}


const useUpdateUploadFile = ():MutationObject=>{
    const [mutate ,{data , loading ,error}]  = useMutation(UPDATE_UPLOAD_FILE)
    return{
        mutate,
        data,
        loading,
        error
    }
}
const useUpdateData = ():MutationObject=>{
    const [mutate ,{data , loading ,error}] = useMutation(UPDATE_DATA)
    return{
        mutate,
        data,
        loading,
        error
    }
}

const useFetchSecuredDeatials = ():QueryObject=>{
    const {data , loading ,error}  = useQuery(FETCH_SECURED_DETAILS)

    return{
        data,
        loading,
        error
    }
}
const useEnterPassword = ():MutationObject=>{
    const [mutate ,{data , loading ,error}] = useMutation(ENTER_PASSWORD)
    return{
        mutate,
        data,
        loading,
        error
    }
}


export {
    useFetchUserData,
    useSignupUser,
    useSigninAdminAccount,
    useSigninEmployeeAccount,
    useSigninVoterAccount,
    useFeedBackUser,
    useVerifyVoters,
    useResendCode,
    useRemoveNotVerifyAccount,
    useUploadFile,
    useBasisDeatails,
    useAuthenticated,
    useLogout,
    useVerifySecret,
    useFetchUserDetails,
    useCapturedImage,
    useVerifyVotersToValidVoters,
    useFetchCandidates,
    useVoting,
    useFetchVotersVote,
    useUpdateUploadFile,
    useUpdateData,
    useFetchSecuredDeatials,
    useEnterPassword
}