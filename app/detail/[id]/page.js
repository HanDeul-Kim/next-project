import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
import Link from "next/link"
import Comment from './Comment'
export default async function Detail(props) {

    let client = await connectDB;
    const db = client.db("next");
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })
    // console.log(props.params.id) //게시글 id
    let userInfo = await db.collection('users').findOne({ _id: new ObjectId(result.id) });
    // console.log(userInfo) // 글 작성자


    // 해당 post의 comment들
    // let comments = await db.collection('comment').find({parent: new ObjectId(props.params.id)}).toArray();

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


