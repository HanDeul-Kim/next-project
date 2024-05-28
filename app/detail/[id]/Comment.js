'use client'
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react"
export default function Comment({ _id, comments }) {
    let [comment, setComment] = useState('');
    let [showComments, setShowComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, [showComments])
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
    const test = "한글은안되냐"

    return (
        <div className="comment-wrap">
            <div className="input-comment">
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <input className="resetInput" type="text" onChange={(e) => {
                        const inValue = e.target.value;
                        setComment(inValue);
                    }} placeholder="댓글을 남겨 보세요." />
                    <button type="submit" onClick={(e) => {
                        fetch('/api/comment/new', {
                            method: 'POST',
                            body: JSON.stringify({
                                comment: comment,
                                _id: _id,
                                date: currentDate,
                                time: currentTime,
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
                                } else if (result.loginError) {
                                    alert('로그인 먼저 해주세요! 😊')
                                    signIn()

                                } else if (result.blankError) {
                                    alert('댓글을 입력 해주세요! 😊')
                                }
                            })
                            .catch(error => console.log(error))
                        document.querySelector('.resetInput').value = '';
                        setComment('');

                    }}>
                        댓글 작성
                    </button>

                </form>
            </div>

            <div className="comment_count">댓글 {showComments.length}개</div>
            {/* 댓글 삭제, 수정, => 관리자 설정 */}
            <ul className="comments">
                {
                    showComments.map((el, idx, arr) => {
                        return (
                            <li key={idx} className="comment-list">
                                <div className="comment-head">
                                    <div className="comment-user">
                                        <img src={showComments[idx].img} alt="" />
                                        <div className="status-img">
                                            <img src={
                                                showComments[idx].role === "master" ?
                                                    "../crown.png"
                                                    :
                                                    "../ogsusu5.png"
                                            } alt="등급별 보이는 이미지." />
                                        </div>
                                        <div className="comment-user-info">
                                            <span>
                                                {showComments[idx].name}
                                            </span>
                                            <span>
                                                {showComments[idx].role === "master" ? '[관리자]' : '[일반 회원]'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="comment-date">
                                        <span>
                                            {showComments[idx].date} {showComments[idx].time}
                                        </span>
                                    </div>
                                </div>

                                <div className="comment-content">
                                    <p>{showComments[idx].content}</p>
                                </div>

                                <div className="comment-footer">
                                    <Link href={`/commentEdit/${test}`}>수정</Link>
                                    <button onClick={() => {
                                        const alertComfirm = confirm("정말 삭제할까요?")
                                        if (alertComfirm) {
                                            axios.delete("/api/comment/viewComments", {
                                                data: showComments[idx]
                                            })
                                                .then((res) => {
                                                    const result = res.data;
                                                    if (result.sucess) {
                                                        alert('삭제 되었습니다.')
                                                    } else if (result.loginError) {
                                                        alert('로그인 먼저 해주세요! 😊')
                                                    } else if (result.userError) {
                                                        alert('권한이 없습니다! 😅')
                                                    }
                                                })
                                                .catch(error => console.log("에러발생 이유", error));
                                        }
                                        // axios.delete("/api/comment/viewComments", {
                                        //     data: showComments[idx]
                                        // })
                                        //     .then((res) => {
                                        //         const result = res.data;
                                        //         if (result.sucess) {
                                        //             alert('삭제 되었습니다.')
                                        //         } else if (result.loginError) {
                                        //             alert('로그인 먼저 해주세요! 😊')
                                        //         } else if (result.userError) {
                                        //             alert('권한이 없습니다! 😅')
                                        //         }
                                        //     })
                                        //     .catch(error => console.log("에러발생 이유", error));
                                    }}>삭제</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}