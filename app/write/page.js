import { connectDB } from "@/util/database.js"
import Link from "next/link"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Check from './Check'
export default async function Write() {

    let client = await connectDB;
    const db = client.db("next");

    let session = await getServerSession(authOptions)

    if(!session) {
        return(
            <Check></Check>
        )
    } else {
        return (
            <div className="layout-lg">
                <div className="write-wrapper">
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
            </div>
        )
    }

    // return (
    //     <div className="layout-lg">
    //         <div class="write-wrapper">
    //             <h4>글 작성</h4>
    //             {/* <form action="/api/test" method="GET">
    //                 <button type="submit">버튼</button>
    //             </form> */}
    //             {/* <form action="/api/date" method="GET">
    //                 <button type="submit">버튼</button>
    //             </form> */}
    //             <div className="input-group">
    //                 <form action="/api/post/new" method="POST">
    //                     <input type="text" name="title" placeholder="글 제목 입력" />
    //                     <input type="text" name="content" placeholder="글 내용 입력" />
    //                     <button type="submit">전송</button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // )
}