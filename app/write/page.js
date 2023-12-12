import { connectDB } from "@/util/database.js"
import Link from "next/link"
export default async function Write() {

    let client = await connectDB;
    const db = client.db("next");

    let result = await db.collection('post').find().toArray();


    return (
        <div class="write-wrapper">
            <h4>글 작성</h4>
            {/* <form action="/api/test" method="GET">
                <button type="submit">버튼</button>
            </form> */}
            {/* <form action="/api/date" method="GET">
                <button type="submit">버튼</button>
            </form> */}
            <div className="input-group">
                <form action="/api/post/new" method="POST">
                    <input type="text" name="title" placeholder="글 제목 입력" />
                    <input type="text" name="content" placeholder="글 내용 입력" />
                    <button type="submit">전송</button>
                </form>
            </div>




        </div>
    )
}