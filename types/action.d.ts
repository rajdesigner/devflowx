interface SignInWithOauthParams {
  user: {
    name: string;
    email: string;
    image?: string;
    username: string;
  };
  provider: 'github' | 'google';
  providerAccountId: string;
}

interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}