import { connectDB } from "@/util/database.js"
import { MongoClient } from "mongodb"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export const revalidate = 60;

export default async function Home() {
    let session = await getServerSession(authOptions)
    // console.log(session)
    // let client = await connectDB;
    // const db = client.db("next");
    // let result = await db.collection('post').find().toArray();

    // login 정보 db
    // let client = await connectDB;
    // const db = client.db("test");
    // let result = await db.collection('users').find().toArray();
    // console.log(result);
    
      

    return (
        <div className="layout-lg">
            <h1>main 페이지 수정</h1>
        </div>
    )
}

  