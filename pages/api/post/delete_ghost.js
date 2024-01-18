import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
    let client = await connectDB;
    const db = client.db("next");


    if (req.method === "DELETE") {


        try {
            let result = await db.collection('post').deleteOne({ _id: new ObjectId(req.body) })
            res.status(200).json('삭제완료')
        }catch (error) {
            console.log(error);
        }
        

    }
}
