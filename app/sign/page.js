import { connectDB } from "@/util/database.js"
import Link from "next/link"
export default async function Write() {

    let client = await connectDB;
    const db = client.db("next");

    return (
        <div class="write-wrapper">
            <h4>회원가입</h4>
            {/* <form action="/api/test" method="GET">
                <button type="submit">버튼</button>
            </form> */}
            {/* <form action="/api/date" method="GET">
                <button type="submit">버튼</button>
            </form> */}
            <div className="input-group">
                <form action="/api/signup/create" method="POST">
                    <input type="text" name="id" placeholder="아이디" />
                    <input type="password" name="password" placeholder="비밀번호" />
                    <input type="password" name="passwordcheck" placeholder="비밀번호 확인" />
                    <button type="submit">가입하기</button>
                </form>
            </div>
        </div>
    )
}

