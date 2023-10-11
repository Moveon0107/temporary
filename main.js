function UI(title, content){
    document.querySelector("body").innerHTML += `
    <div id="Popup">
        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.3);">
        </div>
        <div style="border: 1px solid black; background-color: #ffffff; display: flex; align-items: center; flex-direction: column; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 350px; width: 70vw; border-radius: 15px; user-select: none;">
            <div style="overflow: hidden; text-overflow: ellipsis; border: 1px solid black; padding-left: 10px; padding-right: 40px; width: calc(100% - 50px); height: 50px; line-height: 50px; background-color: dodgerblue; color: #ffffff; font-weight: bold; border-top-left-radius: 15px; border-top-right-radius: 15px; text-align: center;">
                ${title}</div>
            <div style="overflow-y: auto; width: calc(100% - 30px); min-height: 80px; max-height: 80vh; padding: 15px; word-wrap: break-word;">
                ${content}</div>
            <p onclick="document.querySelector('#Popup').remove()" style="position: absolute; margin: 0; top: 10px; right: 10px; border-radius: 5px; background-color: red; width: 30px; height: 30px; line-height: 30px; text-align: center; color: #ffffff; border: 1px solid black;">X</p>
        </div>
    </div>
    `;
}