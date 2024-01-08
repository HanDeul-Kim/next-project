import { connectDB } from "@/util/database.js"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
export default async function handler(req, res) {
    let client = await connectDB;
    const db = client.db("next");
    
    let session = await getServerSession(req, res, authOptions)
    // console.log(props)
    // console.log(session)
    // let result = await db.collection('post').find().toArray();
    // let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})

    if (req.method === "POST") {
        if (req.body.title == '') {
            return res.status(500).json('빈칸을 채워주세요.')
        }
        

        if(session) {
            req.body.id = session.user.id
            // req.body.role = "normal"
        }

        try {
            await db.collection('post').insertOne(req.body)
            res.redirect(302, '/list')
        } catch (error) {
            console.log(error);
        }
        
    }

    // if (req.method === "PUT") {
    //     if (req.body.title == '') {
    //         return res.status(500).json('빈칸을 채워주세요.')
    //     }


    //     // if(post의 id와 session.user의 id가 같다면)
    //     let user = await db.collection('post').findOne({id: session.user.id});
    //     if(user) {
    //         console.log('user가 일치')
    //         return res.status(200).json('일치')
    //     } else {
    //         console.log('user가 불일치')
    //         return res.status(500).json('불일치')
    //     }



    //     // try {
    //     //     await db.collection('post').updateOne({ _id: new ObjectId(props.params.id) },
    //     //         { $set: { title: req.body.title, content: req.body.content } }
    //     //     )
    //     //     res.redirect(302, '/list')
    //     // } catch (error) {
    //     //     console.log(error);
    //     // }
    // }

}


