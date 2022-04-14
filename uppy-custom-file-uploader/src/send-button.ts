import { upload } from "./uppy";

export function addSendEventListener() {
  const input = <HTMLInputElement>document.querySelector(".send")!;
  input.addEventListener("click", uploadFiles);
}

function uploadFiles() {
  const thumbnails = document.querySelectorAll(".thumbnail-container");

  upload();

  thumbnails.forEach((thumbnail) => {
    thumbnail.remove();
  });
}
