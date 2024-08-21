import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User from '@models/userModel';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Store the user ID from MongoDB to the session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connectToDB();

        // Check if the user already exists
        let user = await User.findOne({ email: profile.email });

        // If not, create a new document and save the user in MongoDB
        if (!user) {
          // Generate a valid username
          let username = profile.email.split('@')[0].toLowerCase();

          // Ensure the username meets validation requirements (e.g., 8 characters)
          if (username.length < 4) {
            username = `${username}_${Math.random().toString(36).substr(2, 4)}`;
          }

          user = new User({
            email: profile.email,
            username,
            name: profile.name || '',
            image: profile.picture || '',
          });

          await user.save();
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
