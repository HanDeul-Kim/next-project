import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {


    if (req.method == 'POST') {
        const {name, password, passwordcheck} = req.body;

        let hash = await bcrypt.hash(req.body.password, 10)
        
        req.body.password = hash;
        req.body.passwordcheck = hash;

        // console.log(req.body)
        let db = (await connectDB).db('next');
        await db.collection('user_cred').insertOne(req.body);

        // res.status(200).json('가입성공')
      
    }
}


// 이전 코드
// import { connectDB } from "@/util/database.js"
// export default async function handler(req, res) {
//     let client = await connectDB;
//     const db = client.db("next");
//     const result = await db.collection('login').find().toArray()
    


    
//     if (req.method === "POST") {
//         const { id, password, passwordcheck } = req.body;
//         const existingUser = await db.collection('login').findOne({ id });
//         if (password !== passwordcheck) {
//             return res.status(500).json("비밀번호가 서로 다릅니다.");
//         }
//         if (id === '' || password === '') {
//             return res.status(500).json('id와 password를 모두 입력해주세요.');
//         }
//         if (existingUser) {
//             return res.status(500).json('이미 가입한 id 입니다.');
//         }
//         try {
//             await db.collection('login').insertOne({ id, password });
//             return res.redirect(302, '/list');
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json('가입 중 오류가 발생했습니다.');
//         }
//     }
// }



