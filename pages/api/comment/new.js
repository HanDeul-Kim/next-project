import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req, res) {

    let client = await connectDB;
    const db = client.db("next");
    let session = await getServerSession(req, res, authOptions);
    let conveter = JSON.parse(req.body);


    if (req.method === 'POST') {
        if (session) {
            let userInfo = await db.collection('users').findOne({ _id: new ObjectId(session.user.id) });
            if (conveter.comment === '') {
                res.status(500).json({blankError: true})
            } else {
                let insertComment = {
                    content: conveter.comment,
                    parent: new ObjectId(conveter._id),
                    id: session.user.id,
                    date: conveter.date,
                    time: conveter.time,
                    img: session.user.image,
                    name: session.user.name,
                    // role-based
                    role:userInfo.role 
                }

                let result = await db.collection('comment').insertOne(insertComment);
                res.status(200).json({sucess: true})
            }
        } else {
            res.status(500).json({loginError: true})
        }
    }
}
