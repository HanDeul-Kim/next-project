export default function Register() {
    return (
        <div className="write-wrapper">
            <h4>회원가입</h4>
            {/* <form action="/api/test" method="GET">
                <button type="submit">버튼</button>
            </form> */}
            {/* <form action="/api/date" method="GET">
                <button type="submit">버튼</button>
            </form> */}
            <div className="input-group">
                <form method="POST" action="/api/auth/signup">
                    <input type="email" name="name" placeholder="이메일 형식으로~"></input>
                    <input type="password" name="password" placeholder="비밀번호" />
                    <input type="password" name="passwordcheck" placeholder="비밀번호 확인" />
                    <button type="submit">id/pw 가입요청</button>
                </form>
            </div>
        </div>
    )
}

