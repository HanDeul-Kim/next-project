import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
import Link from "next/link"

export default async function Detail(props) {

    let client = await connectDB;
    const db = client.db("next");
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})
    console.log(props);

    return (
        <div className="layout-lg">
            <div className="details">
                <h4>상세페이지</h4>
                <h4>{result.title}</h4>
                <p>{result.content}</p>
            </div>
            {/* <Link href="./edit">링크</Link> */}
        </div>
    )
}


