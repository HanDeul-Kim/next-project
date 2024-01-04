import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
    let client = await connectDB;
    const db = client.db("next");

    let changed = {
        title: req.body.title,
        content:req.body.content
    }

    // let result = await db.collection('post').updateOne(
    //     {_id: },
    //     {$set : req.body }
    // )
    
    // if (req.method === "POST") {

    //     if (req.body.title == '') {
    //         return res.status(500).json('빈칸을 채워주세요.')
    //     }

    //     try {
    //         await db.collection('post').insertOne(req.body)
    //         res.redirect(302, '/list')
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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
// let client = await connectDB;
// const db = client.db("next");
// // let result = await db.collection('post').find().toArray();

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