import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // logic to salt and hash password
          //   const pwHash = saltAndHashPassword(password);

          // logic to verify if the user exists
          //   user = await getUserFromDb(email, pwHash);
          const response = await axios.post(
            `${process.env.API_URL}/auth/login`,
            credentials,
            {
              withCredentials: true, // This allows cookies to be sent/received
            }
          );

          console.log(response.data);

          if (response.statusText !== "ok") {
            throw new Error("Unauthorized");
          }

          return response.data;

          // return JSON object with the user data
        } catch (error) {
          if (error) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
});
