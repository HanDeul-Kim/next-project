import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    // naver login
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,

    }),
    // github login
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // kakao login
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),

    // jwt 사용자 지정 로그인 방식

    // 아이디 비밀번호 입력 방식 로그인 가능
    CredentialsProvider({

      // 1. 로그인 페이지 & 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        // 로그인 할 때 입력 받을 input 추가
        email: { label: "아이디", type: "text", placeholder: '아이디' },
        password: { label: "비밀번호", type: "password", placeholder: '비밀번호' },
      },

      //2. 로그인 요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null
      async authorize(credentials) {
        let db = (await connectDB).db('next');
        let user = await db.collection('user_cred').findOne({ name: credentials.email })
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return user
      }

    })
  ],
  // jwt 사용자 지정 로그인 방식

  //3. jwt 만료일설정
  session: {
    strategy: 'jwt',
    jwt:true,
    maxAge: 30 * 24 * 60 * 60 // 30일
  },
  // 4. jwt 만들 때 실행되는 코드
  // user 변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어감
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
        // token.user.role = 'general'
      }
      return token
    },

    // 5. 유저 세션이 조회될 때 마다 실행 되는 코드
    session: async ({ session, token }) => {
      // session.user = token.user;

      session.user.id = token.sub;
      session.user.img = token.picture;
      // session.user.role = 'general'
      return session;
            
    },
    // DB accounts, users 조회 
    // signIn: async (user, account, profile) => {
    //   console.log('소셜 로그인 세션 정보:', {
    //     user,
    //     account,
    //     profile,
    //   });
    //   return Promise.resolve(true); // 필요에 따라 이를 처리하실 수 있습니다
    // },

  },
  // 로그인 custom page
  pages: {
    signIn: '/signin',
  },
  // jwt 사용자 지정 로그인 방식 끝

  secret: process.env.NORMAL_SECRET,
  adapter: MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions);