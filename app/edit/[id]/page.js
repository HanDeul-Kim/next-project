import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Fail from '../../Error'
export default async function Edit(props) {

    let client = await connectDB;
    const db = client.db("next");

    const result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
    let session = await getServerSession(authOptions)
    
    // const roleBase = await db.collection('users').find().toArray();
    
    
    if (session) {
        const roleBase = await db.collection('users').findOne({_id: new ObjectId(session.user.id)})
        if (result.id === session.user.id || roleBase.role === "master") {
            return (
                <div className="layout-lg">
                    <div className="write-wrapper">
                        <h4>글 수정</h4>
                        {/* <form action="/api/test" method="GET">
                            <button type="submit">버튼</button>
                        </form> */}
                        {/* <form action="/api/date" method="GET">dfsdasd
                            <button type="submit">버튼</button>
                        </form> */}
                        <div className="input-group">
                            <form action="/api/post/edit" method="POST">
                                <input type="text" name="title" defaultValue={String(result.title)} />
                                <input type="text" name="content" defaultValue={String(result.content)} />
                                <input style={{ display: 'none' }} type="text" name="id" defaultValue={String(result._id)}></input>
                                <button type="submit">수정하기</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Fail type="infoError" />
        }
    } else {
        return <Fail type="loginError" />
        
    }
    // if(result.id === session.user.id) {
    //     return (
    //         <div className="layout-lg">
    //             <div className="write-wrapper">
    //                 <h4>글 수정</h4>
    //                 {/* <form action="/api/test" method="GET">
    //                     <button type="submit">버튼</button>
    //                 </form> */}
    //                 {/* <form action="/api/date" method="GET">dfsdasd
    //                     <button type="submit">버튼</button>
    //                 </form> */}
    //                 <div className="input-group">
    //                     <form action="/api/post/edit" method="POST">
    //                         <input type="text" name="title" defaultValue={String(result.title)} />
    //                         <input type="text" name="content" defaultValue={String(result.content)} />
    //                         <input style={{display: 'none'}} type="text" name="id" defaultValue={String(result._id)}></input>
    //                         <button type="submit">수정하기</button>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // } else {
    //     // console.log('불일치')
    //     return (
    //         <Fail></Fail>
    //     )
    // }


    // const result2 = await db.collection('post').updateOne( {_id: new ObjectId(props.params.id)}, 
    //     { $set: {title:, content: }}
    // )


    // await db.collection('post').updateOne({_id: new ObjectId(props.params.id)},
    //     {$set : { title: '타이틀 변경', content: '내용 변경'}}
    // )

    // return (
    //     <div className="layout-lg">
    //         <div className="write-wrapper">
    //             <h4>글 수정</h4>
    //             {/* <form action="/api/test" method="GET">
    //                 <button type="submit">버튼</button>
    //             </form> */}
    //             {/* <form action="/api/date" method="GET">dfsdasd
    //                 <button type="submit">버튼</button>
    //             </form> */}
    //             <div className="input-group">
    //                 <form action="/api/post/edit" method="POST">
    //                     <input type="text" name="title" defaultValue={String(result.title)} />
    //                     <input type="text" name="content" defaultValue={String(result.content)} />
    //                     <input style={{display: 'none'}} type="text" name="id" defaultValue={String(result._id)}></input>
    //                     <button type="submit">수정하기</button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // )
}
