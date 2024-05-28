'use client';
//   openssl rand -base64 32
import  {SessionProvider} from 'next-auth/react'

const AuthProvider = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthProvider
