import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";

export default async function Edit(props) {

    let client = await connectDB;
    const db = client.db("next");


    const result = await db.collection('post').findOne( {_id: new ObjectId(props.params.id)});
    // const result2 = await db.collection('post').updateOne( {_id: new ObjectId(props.params.id)}, 
    //     { $set: {title:, content: }}
    // )
    

    // await db.collection('post').updateOne({_id: new ObjectId(props.params.id)},
    //     {$set : { title: '타이틀 변경', content: '내용 변경'}}
    // )
    
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
                <form action="/api/post/edit" method="POST">
                    <input type="text" name="title" defaultValue={result.title} />
                    <input type="text" name="content" defaultValue={result.content} />
                    <input style={{display: 'none'}} type="text" name="id" defaultValue={result._id}></input>
                    <button type="submit">수정하기</button>
                </form>
            </div>
        </div>
    )
}
