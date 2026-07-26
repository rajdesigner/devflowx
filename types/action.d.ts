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