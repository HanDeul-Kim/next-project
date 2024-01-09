import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions)

    let client = await connectDB;
    const db = client.db("next");

    // const deleteTarget = db.collection('post').findOne({_id: new ObjectId(JSON.parse(req.query.result))});
    const deleteTarget = await db.collection('post').findOne({ _id: new ObjectId(JSON.parse(req.query.result)._id) })
    // console.log(deleteTarget);

    console.log(req.query.result)   // 659ca0554c07c1ffc190aacf
    console.log(session.user.id)    // 65962e35335561799ee2d911
    
    const babo = await db.collection('post').findOne({});
    console.log(babo)



    // console.log(JSON.parse(req.query.result).author)
    if (req.method === 'DELETE') {
        // *******터미널 error창 session 부분 에러 확인******
        if (session) {
            if (JSON.parse(req.query.result).id === session.user.id) {
                console.log('일치')
                try {
                    const result = await db.collection('post').deleteOne({ _id: new ObjectId(JSON.parse(req.query.result)._id) })
                    res.status(200).json('삭제완료')
                } catch (error) {
                    console.log(error);
                }
            } else {
                // console.log('작성자가 아닙니다.')
                return res.status(500).json('작성자가 아닙니다.')
            }0
        } else {
            res.status(500).json('로그인 먼저 부탁')
        }
        

        // if (JSON.parse(req.query.result).author === session.user.email) {
        //     console.log('일치')
        //     try {
        //         const result = await db.collection('post').deleteOne({ _id: new ObjectId(JSON.parse(req.query.result)._id)})
        //         res.status(200).json('삭제완료')
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

    }
}