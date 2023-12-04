import { connectDB } from "@/util/database.js"
export default async function handler(req, res) {
    let client = await connectDB;
    const db = client.db("next");
    let result = await db.collection('post').find().toArray();


    // if(req.method === "GET") {
    //     return res.status(200).json('200 성공')
    // } else if(req.method === "POST") {
    //     return res.status(200).json('200 성공')
    // } else if(req.method === "PUT") {

    // } else if(req.method === 'DELETE') {

    // }

    // if(req.method === 'GET') {
    //     return res.status(200).json(result)
    // }

    if (req.method === 'POST') {
        await db.collection("post").insertOne({
            title: req.body.title,
            content: req.body.content
        });
        // return res.status(200).json({ message: '저장 완료' });

        res.status(200).end(
            `
                <h1>${title}</h1>
            `
        );
    }

}
