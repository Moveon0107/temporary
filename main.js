function UI(title, content){
    document.querySelector("body").innerHTML += `
    <div id="Popup">
    <div style="display: flex; align-items: center; flex-direction: column; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color:crimson; max-width: 400px; width: 70vw; border-radius: 25px; user-select: none;">
        <div style="width: 100%; height: 50px; line-height: 50px; background-color: dodgerblue; color: #ffffff; font-weight: bold; border-top-left-radius: 25px; border-top-right-radius: 25px; text-align: center;">Title</div>
        <div style="background-color: #ffffff; width: calc(100% - 30px); min-height: 100px; padding: 15px;">Content</div>
        <div onclick="document.querySelector('#Popup').remove()" style="cursor: pointer; width: calc(100% - 10px); background-color: transparent; padding: 5px; margin: 0; text-align: center;">닫기</div>
    </div>
    <div style="width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.3);"></div>
    </div>
    `;
}