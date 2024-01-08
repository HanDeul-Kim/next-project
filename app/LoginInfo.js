'use client'
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LogoutBtn from './LogoutBtn'
// const handleProfile = () => {
//     alert('handle')
// }
export default async function LoginInfo({ session }) {
    // let session = await getServerSession(authOptions);
    // console.log(session);


    // return (
    //     <div className="user-info">
    //         <img onClick={ () => {alert('test')}} src={session.user.img} className="profile-img" alt="" />
    //         <div className="welcome"><b>{session.user.name}</b>님 환영합니다!</div>
    //         <LogoutBtn />
    //     </div>
    // )
    return (
        <div className="user-info">
            <img onClick={() => {
                document.querySelector('.profile-gallery').classList.add('active')
            }
            }
                src={session.user.img} className="profile-img" alt="" />
            <div className="welcome"><b>{session.user.name}</b>님 환영합니다!</div>
            <LogoutBtn />
        </div>
    )
}