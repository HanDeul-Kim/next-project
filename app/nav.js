import Link from "next/link"
import LoginBtn from './LoginBtn'
import LoginInfo from './LoginInfo'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
export default async function Nav() {
    let session = await getServerSession(authOptions)
    // console.log(session);
    return (
        <div className="navbar">
            <div className="left_nav">
                <Link href='/' className="logo"><img src="../ogsusu.png" alt="" /></Link>
            </div>
            <div className="center_nav">
                <Link href='/write'>Write</Link>
                <Link href='/list'>List</Link>
            </div>
            <div className="right_nav">
                {
                    session === null ?
                        <LoginBtn />
                        :
                        <LoginInfo session={session} />
                }
            </div>
        </div>
    )
}