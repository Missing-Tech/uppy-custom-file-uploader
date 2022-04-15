import { UploadedUppyFile } from "@uppy/core";

export function createMessage(
  files: UploadedUppyFile<Record<string, unknown>, Record<string, unknown>>[]
) {
  const messageContainer = document.querySelector(".message-container")!;
  const textInput = <HTMLInputElement>document.querySelector(".chatbox-input")!;

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = textInput.value;

  textInput.value = ''

  files.forEach((file) => {
    const image = document.createElement("img");
    image.className = "message-image";
    image.src = file.uploadURL!;

    message.appendChild(image);
  });

  messageContainer.appendChild(message);
}
