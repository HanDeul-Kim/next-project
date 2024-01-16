'use client'
import { useEffect, useState } from "react"

export default function Comment({ _id }) {
    let [comment, setComment] = useState('');
    let [showComments, setShowComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, [])
    const fetchComments = () => {
        fetch(`/api/comment/viewComments?id=${_id}`)
            .then(r => r.json())
            .then((result) => {
                setShowComments(result);
            })
            .catch(error => console.error(error));
    }

    

    // 날짜
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 일
    month = month >= 10 ? month : '0' + month;
    date = date >= 10 ? date : '0' + date;
    let currentDate = `${year}.${month}.${date}`

    // 시간
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    
    let currentTime = `${hours}:${minutes}`;


    return (
        <div className="comment-wrap">
            <div className="input-comment">
                <form onSubmit={ (e) => {e.preventDefault()}}>
                    <input className="resetInput" type="text" onChange={(e) => {
                        const inValue = e.target.value;
                        setComment(inValue);
                    }} />
                    <button type="submit" onClick={(e) => {
                        fetch('/api/comment/new', {
                            method: 'POST',
                            body: JSON.stringify({
                                comment: comment,
                                _id: _id,
                                date: currentDate,
                                time: currentTime
                            }),
                        })
                            .then((res) => {
                                return res.json()
                            })
                            // .then((result) => {
                            //     if (result.blankError) {
                            //         alert('댓글을 입력해주세요')
                            //     } else {
                                    // fetchComments();
                            //     }
                            // })
                            .then((result) => {
                                if (result.sucess) {
                                    fetchComments();
                                } else if(result.loginError) {
                                    alert('로그인 먼저 해주세요! 😊')
                                } else if(result.blankError) {
                                    alert('댓글을 입력 해주세요! 😊')
                                }
                            })
                            .catch(error => console.log(error))
                            document.querySelector('.resetInput').value = '';
                    }}>
                        댓글 전송

                        {/* 작성자 이름
                        작성자 프사 (nav 프로필과 같이) 
                        작성 시간 */}
                        {/* 엔터로 작성 & 작성 후 빈칸 */}
                        

                    </button>
                </form>
            </div>
            <div className="comment_count">댓글 16개</div>
            {/* class명 => 디자인 => 댓글 삭제, 수정, => 관리자 설정 */}
            <ul className="comments">
                {
                    showComments.map((el, idx, arr) => {
                        return (
                            <li key={idx} className="comment">
                                <div className="comment-profile">
                                    <img src={showComments[idx].img} alt="" />
                                    <div className="comment-profile-name">
                                        <div className="test">
                                            <span>{showComments[idx].name}</span>
                                            <span>{showComments[idx].date} {showComments[idx].time}</span>
                                        </div>
                                        {/* <span>{showComments[idx].name}</span> */}
                                        <span>[일반 회원]</span>
                                    </div>
                                </div>
                                <div className="comment-content">
                                    <p>{showComments[idx].content}</p>
                                </div>
                                
                                <div className="comment-footer">
                                    <button className="comment-edit">수정</button>
                                    <button className="comment-delete">삭제</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
