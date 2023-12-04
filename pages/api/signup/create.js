import { connectDB } from "@/util/database.js"
export default async function handler(req, res) {
    let client = await connectDB;
    const db = client.db("next");
    const result = await db.collection('login').find().toArray()
    

    // if (req.method === "POST") {
    //     if(req.body.id == '') {
    //         return res.status(500).json('id를 입력하세요')
    //     } else if (req.body.password == '') {
    //         return res.status(500).json('password를 입력하세요')
    //     } else if (result[0].id == 'beenzino13') {
    //         return res.status(500).json('id 중복!')
    //     }


    //     try {
    //         await db.collection('login').insertOne(req.body)
    //         res.redirect(302, '/list')
    //     } catch (error) {
    //         console.log(error);
    //     }
        
    // }

    if(req.method === "POST") {
        const existingUser = await db.collection('login').findOne({id: req.body.id});
        if(existingUser) {
            return res.redirect(302, '/sign');
        }
        if(req.body.id == '' || req.body.password == '') {
            return  res.status(500).json('id와 password를 모두 입력해주세요.')
        }
        
        try {
            await db.collection('login').insertOne(req.body)
            return res.redirect(302, '/list');
        } catch(error) {
            console.log(error)
            return res.status(500).json('가입 중 오류가 발생했습니다.')
        }
    }
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



