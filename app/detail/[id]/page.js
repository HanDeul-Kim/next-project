import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
import Link from "next/link"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Comment from './Comment'
export default async function Detail(props) {

    let client = await connectDB;
    const db = client.db("next");
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })

    let session = await getServerSession(authOptions)
    let userInfo = await db.collection('users').findOne({ _id: new ObjectId(result.id) });

    // session이 아닌 최초 글 등록 했을때 유저의 이름, 프로필사진, 시간이여야 함
    return (
        <div className="layout-lg col">
            <div className="details">
                <div className="wrapper">
                    <div className="detail-head">
                        <div className="list-writer">
                            <img className="profile-img" src={result.user_img} />
                            <span className="writer">
                                <span>
                                    {
                                        userInfo.role === 'master' ? '[ 관리자 ]' : '[ 알갱이 회원 ]'
                                    }
                                </span>
                                <span>{result.user_name}</span>
                            </span>
                        </div>
                        <div className="list-date">
                            <div className="date-icon">📅</div>
                            <div className="date-result">
                                <div>{result.date}</div>
                                <div>{result.time}</div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <h4>상세페이지</h4>
                        <h4>{result.title}</h4>
                        <p>{result.content}</p>
                    </div>
                </div>

                <Comment _id={result._id.toString()} />
            </div>
        </div>
    )
}


