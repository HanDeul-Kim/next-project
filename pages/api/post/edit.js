import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
export default async function handler(req, res) {
    let client = await connectDB;
    const db = client.db("next");


    // const result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
    // let session = await getServerSession(authOptions)
    // console.log(session);
    
    let changed = {
        title: req.body.title,
        content:req.body.content
    }

    if (req.method === "POST") {
        if (req.body.title == '') {
            return res.status(500).json('빈칸을 채워주세요.')
        }

        await db.collection('post').updateOne({_id: new ObjectId(req.body.id)},
        { $set: changed }
        
        )
        res.redirect(302, '/list')
        // try {
        //     await db.collection('post').updateOne({ _id: new ObjectId(req.body.id) },
        //         { $set: changed }
        //     )
        //     res.redirect(200, '/list')
        // } catch (error) {
        //     console.log(error);
        // }
    }

    // if (req.method == 'POST') {
    //     if (req.body.title == '') {
    //         return res.status(500).json('제목써라')
    //     }
    //     try { 
    //         let db = (await connectDB).db('next')
    //         let result = db.collection('post').insertOne(res.body)
    //         res.redirect(302, '/list')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}