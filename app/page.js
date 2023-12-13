import { connectDB } from "@/util/database.js"
import { MongoClient } from "mongodb"


export const revalidate = 60;

export default async function Home() {

    // let client = await connectDB;
    // const db = client.db("next");
    // let result = await db.collection('post').find().toArray();

    // login 정보 db
    // let client = await connectDB;
    // const db = client.db("test");
    // let result = await db.collection('users').find().toArray();
    // console.log(result);
    
      

    return (
        <>
            {/* <h1>main 페이지</h1> */}
        </>
    )
}

  