'use client'
import { useEffect, useState } from "react"

export default function Comment({ _id }) {
    let [comment, setComment] = useState('');
    let [showComments, setShowComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, [])
    const fetchComments = () => {
        fetch(`/api/comment/list?id=${_id}`)
        .then(r => r.json())
        .then((result) => {
            setShowComments(result);
        })
        .catch(error => console.error(error));
    }

    return (
        <div className="comment-wrap">
            <ul className="comments">
                {
                    showComments.map( (el, idx, arr) => {
                        return (
                            <li key={idx} className="comment">{showComments[idx].content}</li>
                        )
                    })
                }
            </ul>
            <div className="input-comment">
                <input type="text" onChange={(e) => {
                    const inValue = e.target.value;
                    setComment(inValue);
                }} />
                <button type="submit" onClick={(e) => {
                    fetch('/api/comment/new', {
                        method: 'POST',
                        body: JSON.stringify({
                            comment: comment,
                            _id: _id,
                            // time: "1"
                        })
                    })
                        .then((res) => {
                            return res.json()
                        })
                        .then((result) => {
                            if (result.blankError) {
                                alert('댓글을 입력해주세요')
                            } else {
                                fetchComments();
                            }
                        })
                        .catch(error => console.log(error))
                }}>
                    댓글전송

                    {/* 작성자 이름
                    작성자 프사 (nav 프로필과 같이) 
                    작성 시간 */}
                    {/* 엔터로 작성 & 작성 후 빈칸 */}

                </button>
            </div>
        </div>
    )
}