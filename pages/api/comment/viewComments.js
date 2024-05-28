// get요청 받으면 보여 줄 서버 페이지

import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions)

    let client = await connectDB;
    const db = client.db("next");

    // let result = await db.collection('comment').find({ parent: new ObjectId(req.query.id) }).toArray()
    // res.status(200).json(result)
    // let result = await db.collection('comment').find({ parent: new ObjectId(req.query.id) }).toArray()


    // console.log(req.query.id) // 게시글 id
    // console.log(result[0])

    // delete 블록 안으로
    // const deleteTarget = await db.collection('comment').findOne({ _id: JSON.parse(req.query.deleteId).id })

    if (req.method === "GET") {
        let result = await db.collection('comment').find({ parent: new ObjectId(req.query.id) }).toArray()
        res.status(200).json(result)
    } else if (req.method === "POST") {
        console.log('수정')
        res.status(200).json(result)
    } else if (req.method === "DELETE") {
        if (session) {
            const deleteTarget = await db.collection('comment').findOne({ id: req.body.id })
            const roleBase = await db.collection('users').findOne({ _id: new ObjectId(session.user.id) })
            if (deleteTarget.id === session.user.id || roleBase.role === "master") {
                try {
                    await db.collection('comment').deleteOne({ _id: new ObjectId(req.body._id) })
                    res.status(200).json({ sucess: true })
                } catch (error) {
                    console.log(error);
                }
            } else {
                res.status(200).json({ userError: true })
            }
        } else {
            res.status(200).json({ loginError: true })
        }
    }
}


