'use client'
// import { connectDB } from "@/util/database.js"
import Link from "next/link"
import { useState } from "react"

export default function ListItem({ result }) {
    return (
        <>
            {
                result.map((el, idx) => (
                    <div className="list-item" key={idx}>
                        <Link href={`./detail/${result[idx]._id}`}>
                            <h4>{result[idx].title}</h4>
                        </Link>
                        <p>{result[idx].content}</p>
                        <div className="btns">
                            <Link className="edit" href={`/edit/${result[idx]._id}`}>수정</Link>
                            <Link className="delete" href=''
                                onClick={(e) => {
                                    // // 간단하게 axios 사용해도 좋을 듯?
                                    // fetch('/api/post/delete', {
                                    //     method: 'DELETE',
                                    //     body: result[idx]._id
                                    // })
                                    //     .then((r) => {
                                    //         if (r.status == 200) {
                                    //             return r.json();
                                    //         } else {
                                    //             // 서버가 에러코드 전송시 실행할 코드
                                    //         }
                                    //     })
                                        // .then((result) => {
                                        //     // 성공시 실행할 코드
                                        //     document.querySelectorAll('.list-item')[idx].classList.add('active')
                                        //     setTimeout( () => {
                                        //         e.target.parentElement.parentElement.style.display = 'none'
                                        //     }, 500)
                                        // })
                                    //     .catch((error) => {
                                    //         // 인터넷 문제로 실패시 실행 할 코드
                                    //         console.log(error);
                                    //     })
                                    // e.target.parentElement.parentElement.classList.add('active');


                                    // query 스트링
                                    // fetch(`/api/post/delete?currentId=${result[idx]._id}&두번 째 보내고 싶은 데이터 작명=데이터`, {
                                    //     method: 'DELETE',
                                    // })
                                    // fetch(`/api/post/delete?currentId=${result[idx]._id}`, {
                                    //     method: 'DELETE',

                                    // })
                                    // .then((r)=> {
                                    //     if(r.status == 200) {
                                    //         return r.json();
                                    //     } else  {
                                    //         console.log('실패')
                                    //     }
                                    // })
                                    // .then((re)=>{
                                    //     alert('성공')
                                    // })
                                    // .catch(error => console.log(error))
                                    fetch(`/api/abc/${JSON.stringify(result[idx])}`,{
                                        method: 'DELETE'
                                    })
                                    .then((r)=> {
                                        if(r.status == 200) {
                                            return r.json();
                                        } else  {
                                            alert('로그인을 먼저 해주세요!')
                                        }
                                    })
                                    .then((re)=>{
                                        e.target.parentElement.parentElement.classList.add('active')
                                        setTimeout( () => {
                                            e.target.parentElement.parentElement.style.display = 'none'
                                        },500)
                                    })
                                    .catch(error => console.log(error))
                                }}>
                                삭제하기
                            </Link>
                            
                        </div>
                    </div>
                ))
            }
        </>
    )
}