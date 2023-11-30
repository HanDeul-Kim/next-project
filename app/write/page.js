import { connectDB } from "@/util/database.js"
import Link from "next/link"
export default async function Write() {

    let client = await connectDB;
    const db = client.db("next");

    let result = await db.collection('post').find().toArray();

    console.log(result);

    return (
        <div className="list-bg">
            <DataText result={result}></DataText>
        </div>
    )


}