function Signup_Email(input, seq) {
    input = input.trim() || "None";
    switch (seq) {
        case 0:
            if (input == "None") {
                UI("ClanTalk - 회원가입", "이메일을 입력하세요.");
                document.querySelector('.container input').value = "";
            } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input)) {
                email = input;
                document.querySelector('.container input').placeholder = "비밀번호를 입력하세요.";
                document.querySelector('.container input').value = "";
                document.querySelector('.container p').setAttribute('onclick', "Signup_Email(document.querySelector('.container input').value, 1);");
            } else {
                UI("ClanTalk - 회원가입", "올바르지 않은 이메일 주소입니다.");
            }
            break;

        case 1:
            if (input == "None") {
                UI("ClanTalk - 회원가입", "비밀번호를 입력하세요.");
                document.querySelector('.container input').value = "";
            } else if (/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(input)) {
                if (input.length >= 8 && input.length < 20) {
                    password = input;
                    document.querySelector('.container h2').textContent = "회원정보";
                    document.querySelector('.container input').placeholder = "닉네임을 입력하세요.";
                    document.querySelector('.container input').value = "";
                    document.querySelector('.container p').setAttribute('onclick', "Signup_Email(document.querySelector('.container input').value, 2);");
                } else {
                    UI("ClanTalk - 회원가입", "비밀번호는 8글자 이상 20글자 미만이어야 합니다.");
                    document.querySelector('.container input').value = "";
                }
            } else {
                UI("ClanTalk - 회원가입", "영어, 숫자, 특수 문자 중에서 하나 이상을 포함하는지 확인하세요.");
                document.querySelector('.container input').value = "";
            }
            break;

        case 2:
            if (input == "None") {
                UI("ClanTalk - 회원가입", "닉네임을 입력하세요.");
                document.querySelector('.container input').value = "";
            } else if (/^[\wㄱ-ㅎ가-힣]+$/.test(input)) {
                if (input.length < 20) {
                    nickname = input;
                    document.querySelector('.container input').type = "date";
                    document.querySelector('.container input').min = new Date().getFullYear()-90+"-01-01"
                    document.querySelector('.container input').max = new Date().getFullYear()+"-12-31";
                    document.querySelector('.container input').removeAttribute("placeholder");
                    document.querySelector('.container p').setAttribute('onclick', "Signup_Email(document.querySelector('.container input').value, 3);");
                    UI("ClanTalk - 회원가입", "생년월일을 입력하세요.");
                } else {
                    UI("ClanTalk - 회원가입", "닉네임은 20글자 미만이어야 합니다.");
                    document.querySelector('.container input').value = "";
                }
            } else {
                UI("ClanTalk - 회원가입", "한국어, 영어, 숫자, 언더바(_)만 입력이 가능합니다.");
                document.querySelector('.container input').value = "";
            }
            break;

        case 3:
            if (input == "None") {
                UI("ClanTalk - 회원가입", "생년월일을 입력하세요.");
            } else {
                document.querySelector('.container').innerHTML += "<p style='margin: 0; font-size: 12px; font-weight: bold; color: tomato;' id='remaining-time'>남은 시간: 5분 0초</p>";
                Email_request(nickname, email);
                document.querySelector('.container input').placeholder = "인증 코드를 입력하세요.";
                document.querySelector('.container input').value = "";
                document.querySelector('.container p').setAttribute('onclick', "Signup_Email(document.querySelector('.container input').value, 4);");
                document.querySelector('.container input').removeAttribute("type");
                document.querySelector('.container input').removeAttribute("max");
                document.querySelector('.container input').removeAttribute("min");
            }
            break;

        case 4:


        break

        default:
            UI("경고", "데이터를 수정하지 마십시오!");
            break;
    }
}
function Email_request(nickname, email) {
    updateRemainingTime(5*6*1000, Date.now());
    event.preventDefault();

    // 서버로 POST 요청 보내기
    fetch('https://clantalk-server.moveon.kro.kr/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nickname": nickname,
            "email": email
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('이메일 발송 성공:', data.message);
            UI("ClanTalk - 회원가입", "입력하신 이메일("+email+")로 인증 코드가 발송되었습니다.");
        })
        .catch(error => {
            console.error('이메일 발송 실패:', error);
            UI("ClanTalk - 회원가입", "인증 코드 발송에 실패하였습니다.");
        });
    



}

// 남은 시간을 업데이트하고 표시하는 함수
function updateRemainingTime(coolTime, startTime) {
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