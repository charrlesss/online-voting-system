import { createUploadLink } from 'apollo-upload-client';
import {
  ApolloClient,
  InMemoryCache,
  from
} from "@apollo/client";
import { onError } from '@apollo/client/link/error';



const uploadLink = createUploadLink({uri:'/graphql' ,credentials:'include'})
const refreshLink = onError(( { networkError}:any) => {
  if (networkError.statusCode === 401) {
    window.location.reload()
  }
  if (networkError.statusCode === 405) {
    setTimeout(()=>{
      window.location.reload()
    },3000)
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    refreshLink,
    uploadLink
    
  ]),
});

export default client