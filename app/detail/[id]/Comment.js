'use client'
import { useEffect, useState } from "react"

export default function Comment({ _id }) {
    let [comment, setComment] = useState('');

    useEffect(() => {
        fetch(`/api/comment/list?id = ${_id}`)
        .then(r => r.json())
        .then((result) => {
            // console.log(result)
        })
    }, [])

    return (
        <div className="comment">
            <div>
                댓글 목록
            </div>
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
                        })
                    })
                        .then((res) => {
                            return res.json()
                        })
                        .then((result) => {
                            if (result.blankError) {
                                alert('댓글을 입력해주세요')
                            }
                        })
                        .catch(error => console.log(error))
                }}>
                    댓글전송
                </button>
            </div>
        </div>
    )
}