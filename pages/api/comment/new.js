import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions);
    
    let conveter = JSON.parse(req.body);
    let client = await connectDB;
    const db = client.db("next")

    if (req.method === 'POST') {
        if (session) {
            if (conveter.comment === '') {
                res.status(500).json({blankError:'빈칸입니다.'})
            } else {
                let insertComment = {
                    content: conveter.comment,
                    parent: new ObjectId(conveter._id),
                    id: session.user.id
                }
    
                let result = await db.collection('comment').insertOne(insertComment);
                res.status(200).json('저장')
            }
        }

    }
}