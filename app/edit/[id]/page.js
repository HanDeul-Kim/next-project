import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";

export default async function Edit(props) {

    let client = await connectDB;
    const db = client.db("next");
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})
    console.log(props);


    // 주석처리 해야 함
    await db.collection('post').updateOne({_id: new ObjectId(props.params.id)})

    
    return (
        <div class="write-wrapper">
            <h4>글 수정</h4>
            {/* <form action="/api/test" method="GET">
                <button type="submit">버튼</button>
            </form> */}
            {/* <form action="/api/date" method="GET">
                <button type="submit">버튼</button>
            </form> */}
            <div className="input-group">
                <form action="/api/post/new" method="PUT">
                    <input type="text" name="title" defaultValue={result.title} />
                    <input type="text" name="content" defaultValue={result.content} />
                    <button type="submit">수정하기</button>
                </form>
            </div>
        </div>
    )
}

