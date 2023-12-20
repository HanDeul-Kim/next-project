import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
export default async function Profile() {
    let session = await getServerSession(authOptions);
    {
        if (session) {
            
            return (
                <div className="profile-gallery">
                    <div className="profile">
                        <img src={session.user.img} alt="" />
                    </div>
                </div>
            )
        }
    }

}