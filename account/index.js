function Signup_Email(input) {
    input = input || "None";
    if (input == "None") {
        UI("제목", "입력하셈");
    }else{
        to_email = input;
        Email_request(input);
    }
}
function Email_request(email) {
    event.preventDefault();

    // 서버로 POST 요청 보내기
    fetch('https://clantalk-server.moveon.kro.kr/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to_email: email })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('이메일 인증 코드가 전송되었습니다.');
        })
        .catch(error => {
            console.error('오류:', error);
            alert('이메일 인증 코드 요청 중 오류가 발생했습니다.');
        });
}