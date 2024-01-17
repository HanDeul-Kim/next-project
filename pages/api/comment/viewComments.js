// get요청 받으면 보여 줄 서버 페이지

import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {


    let client = await connectDB;
    const db = client.db("next");


    // let result = await db.collection('comment').find({ parent: new ObjectId(req.query.id) }).toArray()
    
    // res.status(200).json(result)

    if(req.method === "GET") {
        let result = await db.collection('comment').find({ parent: new ObjectId(req.query.id) }).toArray()
        res.status(200).json(result)
    } 
    // else if(req.method === "DELETE") {
    //     console.log('딜리트')
    //     res.status(200)
    // }
}