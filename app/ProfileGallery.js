'use client'
// import { getServerSession } from 'next-auth'
// import { authOptions } from "@/pages/api/auth/[...nextauth]"
export default async function Profile({session}) {
    // let session = await getServerSession(authOptions);
    {
        // if (session) {
            
            return (
                <div className="profile-gallery">
                    <div className="profile">
                        <img src={session.user.img} alt="" />
                    </div>
                    <div className="gallery-close" onClick={() => {
                        document.querySelector('.profile-gallery').classList.remove('active')}}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )
        // }
    }

}