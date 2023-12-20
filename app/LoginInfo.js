// 'use client'
// use client 사용하면 이렇게 된다고??
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
// import LogOutBtn from './LogoutBtn';
export default async function LoginInfo() {
    let session = await getServerSession(authOptions);
    return (
        <div className="user-info">
            <img src={session.user.img} className="profile-img" alt="" />
            <div className="welcome"><b>{session.user.name}</b>님 환영합니다!</div>
        </div>
    )
}
