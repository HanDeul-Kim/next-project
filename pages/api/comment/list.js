// get요청 받으면 보여 줄 서버 페이지

import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
    // let client = await connectDB;
    // const db = client.db("next");

    console.log(req.query);

    // let result = await db.collection('comment').find({ parent: new ObjectId(req.query.id) }).toArray()
    // res.status(200).json(result)

    


    // ObjectId(659f8f57cec3c3c8b3dda2b2)
    // "컨텐츠"
    // ObjectId(659f39fbc40fab9e8d569a8c)
    // "65962e35335561799ee2d911"
    

}