import { connectDB } from "@/util/database.js"
import Link from "next/link"
export default async function List() {

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

function DataText({result}) {
    return (
        <>       
            {
                result.map((el, idx) => (
                    <div className="list-item" key={idx}>
                        <Link href={`./detail/${result[idx]._id}`}>
                            <h4>{result[idx].title}</h4>
                        </Link>
                        <p>{result[idx].content}</p>
                    </div>
                ))
            }
        </>

    )
}
