import { getUppy } from "./uppy";

const input = <HTMLInputElement>document.getElementById("file-upload")!;
const uppy = getUppy();

uppy.on("thumbnail:generated", (file, preview) => addThumbnail(file, preview));

export function addInputEventListener() {
  input.addEventListener("change", previewFiles);
}

function addThumbnail(file: any, preview: string) {
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
  document.querySelector(".thumbnails-holder")?.appendChild(thumbnailContainer);
}

function removeFile(e: Event) {
  const target = e.target as HTMLInputElement;
  console.log(target.id);
  document.getElementById(target.id)?.parentElement?.remove();
  uppy.removeFile(target.id);
}

function previewFiles() {
  const files = input.files;
  if (files != null) {
    for (var i = 0; i < files.length; i++) {
      var file: File = files.item(i)!;
      try {
        uppy.addFile({
          source: "file input",
          name: file.name,
          type: file.type,
          data: file,
        });
      } catch (err: any) {
        if (err.isRestriction) {
          // handle restrictions
          console.log("Restriction error:", err);
        } else {
          // handle other errors
          console.error(err);
        }
      }
    }
  }
}
