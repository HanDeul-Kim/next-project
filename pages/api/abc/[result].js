import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    let client = await connectDB;
    const db = client.db("next");

    if (req.method === 'DELETE') {
        
        try {
            const result = await db.collection('post').deleteOne({ _id: new ObjectId(JSON.parse(req.query.result))})
            res.status(200).json('삭제완료')
        } catch (error) {
            console.log(error);
        }
    }
}
