import "./style.css";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import ThumbnailGenerator from "@uppy/thumbnail-generator";

const uppy = new Uppy();
var uploadedFiles = [];

const fileUpload = document.getElementById("file-upload");
const sendButton = document.querySelector(".send");
fileUpload.addEventListener("change", previewFiles);
sendButton.addEventListener("click", uploadFiles);

uppy.use(Tus, {
  endpoint: "https://tusd.tusdemo.net/files/"
});

uppy.use(ThumbnailGenerator, {
  id: "ThumbnailGenerator",
  thumbnailWidth: 200,
  thumbnailHeight: 200,
  thumbnailType: "image/jpeg",
  waitForThumbnailsBeforeUpload: false
});

uppy.on("thumbnail:generated", (file, preview) => addThumbnail(file, preview));

function upload() {
  uppy.upload().then((result) => {
    console.info("Successful uploads:", result.successful);

    if (result.successful.length > 0) {
      uploadedFiles.push(...result.successful);
    }

    if (result.failed.length > 0) {
      console.error("Errors:");
      result.failed.forEach((file) => {
        console.error(file.error);
      });
    }
  });
}

function createMessages() {
  const messageContainer = document.querySelector(".message-container");
  const textInput = document.querySelector(".chatbox-input");
  const message = document.createElement("div");

  message.className = "message";
  message.textContent = textInput.value;

  textInput.value = "";
  console.log(uploadedFiles);
  if (uploadedFiles.length > 0) {
    uploadedFiles.forEach((file) => {
      const image = document.createElement("img");
      image.className = "message-image";
      image.src = file.preview;
      message.appendChild(image);
    });

    uploadedFiles = [];
    messageContainer.appendChild(message);
  }
}

function uploadFiles() {
  const thumbnails = document.querySelectorAll(".thumbnail-container");

  createMessages();

  thumbnails.forEach((thumbnail) => {
    thumbnail.remove();
  });

  uppy.reset();
}

function addThumbnail(file, preview) {
  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className = "thumbnail-container";

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "close-thumbnail";
  closeButton.addEventListener("click", removeFile);
  closeButton.id = file.id;

  const img = document.createElement("img");
  img.className = "thumbnail";
  img.src = preview;

  thumbnailContainer.appendChild(img);
  thumbnailContainer.appendChild(closeButton);
  document.querySelector(".thumbnails-holder").appendChild(thumbnailContainer);
}

function removeFile(e) {
  const target = e.target;
  document.getElementById(target.id).parentElement.remove();
  uppy.removeFile(target.id);
}

function previewFiles() {
  const files = fileUpload.files;
  if (files != null) {
    for (var i = 0; i < files.length; i++) {
      var file = files.item(i);
      try {
        uppy.addFile({
          source: "file input",
          name: file.name,
          type: file.type,
          data: file
        });
      } catch (err) {
        if (err.isRestriction) {
          // handle restrictions
          console.log("Restriction error:", err);
        } else {
          // handle other errors
          console.error(err);
        }
      }
    }
    upload();
    //uppy.reset();
  }
}
