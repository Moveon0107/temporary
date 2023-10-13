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
        body: JSON.stringify({
            "name": "철수",
            "email": "moveon0107@gmail.com" 
         })
    })
        .then(response => response.json())
        .then(data => {
            console.log('이메일 발송 성공:', data.message);
        })
        .catch(error => {
            console.error('이메일 발송 실패:', error);
        });
        


}