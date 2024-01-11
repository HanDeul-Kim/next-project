import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
import Link from "next/link"
import Comment from './Comment'
export default async function Detail(props) {

    let client = await connectDB;
    const db = client.db("next");
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})

    return (
        <div className="layout-lg col">
            <div className="details">
                <div className="content">
                    <h4>상세페이지</h4>
                    <h4>{result.title}</h4>
                    <p>{result.content}</p>
                </div>
                <Comment _id={result._id.toString()}/>
            </div>
        </div>
    )
}


