import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/config/database'
import User from '@/models/User'



// authorization: {  //  to allow other users to login, otherwise only one user will be able to login
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: { 
                params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
                     }
                 }
                    })
    ],
    callbacks: {
        // Invoked on successful signin
        async signIn({profile}) { // 1st callback
            // 1. Connect to DB
            await connectDB();
         //   console.log('callbacks-test-L28')
            // 2. Check if loging In user exists,, find where the email is equal to profile.email
            const userExists = await User.findOne({email:profile.email});// find the user by the email.which now we have access to it through profile object,
            //profile, contains email,username,image & google id
            // 3. If not, then add user to database
            // console.log('profile-authOptions-L33', profile)
            // console.log('userExists-authOptions-L34', userExists)
            if (!userExists) { // if user does NOT exist, then we wanna save to the database
               //truncate username if too long
               const username = profile.name.slice(0,20); //cut username to max 20 chars

               await User.create({ // save the below into User model
                email: profile.email,
                username,
                image: profile.picture
               })

              }
            // 4. Return true to allow the  sign In to continue
              return true
        }, // 

            // Modifies the session object,, a session, is a user usage of the application(i-e, login,post or rent)
        async session({session}) { // 2nd callback
            // 1. Get the loging In user from the db
                const user = await User.findOne({email: session.user.email}) ; 
              //  console.log('user-authOptins-L60', user)
            // 2. Assign the use _id to the session,, 
                session.user.id = user._id.toString() // give this session an ID,, simply: give the user _id(from the DB) assign it to the recent session(usage of application) 
            // 3. Return that session 
         //   console.log('session-authOptiona-L64', session)
            return session;
        }
    }
}

// export default NextAuth(authOptions)