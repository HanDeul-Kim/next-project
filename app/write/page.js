import { connectDB } from "@/util/database.js"
import Link from "next/link"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Check from './Check'
export default async function Write() {

    let client = await connectDB;
    const db = client.db("next");

    let session = await getServerSession(authOptions)


    // 날짜
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 일
    month = month >= 10 ? month : '0' + month;
    date = date >= 10 ? date : '0' + date;
    let currentDate = `${year}년 ${month}월 ${date}일`

    // 시간
    let hours = today.getHours();
    let minutes = today.getMinutes();

    // 오전/오후 표시
    let ampm = hours >= 12 ? '오후' : '오전';

    // 12시간 형식으로 변환
    hours = hours % 12;
    hours = hours ? hours : 12;

    // 0을 붙여서 두 자리로 만들기
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);

    let currentTime = `${ampm} ${hours}:${minutes}`;

    if (!session) {
        return (
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
                            <input style={{ display: 'none' }} type="text" name="user_name" defaultValue={session.user.name} />
                            <input style={{ display: 'none' }} type="text" name="user_img" defaultValue={session.user.img} />
                            <input style={{ display: 'none' }} type="text" name="date" defaultValue={currentDate} />
                            <input style={{ display: 'none' }} type="text" name="time" defaultValue={currentTime} />
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