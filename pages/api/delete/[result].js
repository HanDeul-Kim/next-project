import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Fail from '../../../app/Error'
export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions)

    let client = await connectDB;
    const db = client.db("next");

    const deleteTarget = await db.collection('post').findOne({ _id: new ObjectId(JSON.parse(req.query.result)) })

    // console.log(req.query.result)   // 659ca0554c07c1ffc190aacf (글 id)
    // console.log(session.user.id)    // 65962e35335561799ee2d911 (작성자 id)

    // console.log(JSON.parse(req.query.result).author)
    
    if (req.method === 'DELETE') {
        if (session) {
            const roleBase = await db.collection('users').findOne({ _id: new ObjectId(session.user.id) })
            if (deleteTarget.id === session.user.id || roleBase.role === "master") {
                try {
                    const result = await db.collection('post').deleteOne({ _id: new ObjectId(JSON.parse(req.query.result)) })
                    const deleteComment = await db.collection('comment').deleteMany({ parent: new ObjectId(JSON.parse(req.query.result))})
                    res.status(200).json({sucess:'삭제완료'})
                } catch (error) {
                    console.log(error);
                }
            } else {
                res.status(500).json({userError: '사용자 정보가 다름'})
            }
        } else {
            res.status(500).json({loginError: '로그인 먼저 하셈'})
        } 
        
    }
}