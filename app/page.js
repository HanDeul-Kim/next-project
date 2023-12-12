import { connectDB } from "@/util/database.js"
import { MongoClient } from "mongodb"


export const revalidate = 60;

export default async function Home() {

    let client = await connectDB;
    const db = client.db("next");
    let result = await db.collection('post').find().toArray();
      

    return (
        <>
            <h1>main 페이지</h1>
        </>
    )
}

  