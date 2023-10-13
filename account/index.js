function Signup_Email(input, seq) {
    input = input.trim() || "None";
    switch (seq) {
        case 0:
            if (input == "None") {
                UI("ClanTalk - 회원가입", "이메일을 입력하세요.");
            } else {
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

                if (emailRegex.test(input)) {
                    console.log("올바른 이메일 주소입니다.");
                    document.querySelector('.container input').placeholder = "비밀번호를 입력하세요.";
                    document.querySelector('.container input').value = "";
                    document.querySelector('.container p').setAttribute('onclick', "Signup_Email(document.querySelector('.container input').value, 1);");

                } else {
                    UI("ClanTalk - 회원가입", "올바르지 않은 이메일 주소입니다.");
                }
                //Email_request(input);
            }
            break;
        case 1:
            if (input == "None") {
                UI("ClanTalk - 회원가입", "비밀번호를 입력하세요.");
                document.querySelector('.container input').value = "";
            } else if (input.length >= 8) {
                document.querySelector('.container h2').textContent = "회원정보";
                document.querySelector('.container input').placeholder = "닉네임을 입력하세요.";
                document.querySelector('.container input').value = "";
                document.querySelector('.container p').setAttribute('onclick', "Signup_Email(document.querySelector('.container input').value, 2);");
            } else {
                UI("ClanTalk - 회원가입", "비밀번호는 8글자 이상이어야 합니다.");
                document.querySelector('.container input').value = "";
            }
            break;
            
        case 2:
            if (input == "None") {
                UI("ClanTalk - 회원정보", "닉네임을 입력하세요.");
                document.querySelector('.container input').value = "";
            } else {
                input = input.replace(/[^\w\sㄱ-ㅎ가-힣]/gi, '');
                UI("ClanTalk - 회원정보", input);
            }

        break;

        default:
            UI("경고", "데이터를 수정하지 마십시오!");
            break;
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
            "email": email
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('이메일 발송 성공:', data.message);
        })
        .catch(error => {
            console.error('이메일 발송 실패:', error);
        });
    // 클라이언트 쿨타임 설정 (5분을 밀리초로 변환)
    const coolTime = 5 * 60 * 1000;

    // 클라이언트에서 쿨타임 시작 시간 기록
    const startTime = Date.now();

    // 남은 시간을 업데이트하고 표시하는 함수
    function updateRemainingTime() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const remainingTime = coolTime - elapsedTime;

        if (remainingTime <= 0) {
            // 쿨타임이 종료된 경우
            document.getElementById('remaining-time').textContent = '쿨타임 종료';
        } else {
            // 쿨타임이 진행 중인 경우
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = ((remainingTime % 60000) / 1000).toFixed(0);
            document.getElementById('remaining-time').textContent = `남은 시간: ${minutes}분 ${seconds}초`;
            setTimeout(updateRemainingTime, 1000); // 1초마다 업데이트
        }
    }

    // 페이지 로드 시 남은 시간 업데이트 시작
    window.onload = updateRemainingTime;



}