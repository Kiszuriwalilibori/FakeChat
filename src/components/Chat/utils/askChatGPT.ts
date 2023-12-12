import { GPTRequestBody } from "types/index";

export async function askChatGPT(apiRequestBody: GPTRequestBody) {
    await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + process.env.REACT_APP_CHAT_GPT_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
    })
        .then(data => {
            return data.json();
        })
        .then(data => {
            // console.log("The answer is: ", data);
        });
}

export default askChatGPT;
