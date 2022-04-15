import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import { createMessage } from "./message";

const uppy: Uppy = new Uppy();

uppy.use(Tus, {
  endpoint: "https://tusd.tusdemo.net/files/",
});

uppy.use(ThumbnailGenerator, {
  id: "ThumbnailGenerator",
  thumbnailWidth: 200,
  thumbnailHeight: 200,
  thumbnailType: "image/jpeg",
  waitForThumbnailsBeforeUpload: false,
});

export function getUppy() {
  return uppy;
}

export function upload() {
  uppy.upload().then((result) => {
    console.info("Successful uploads:", result.successful);

    if(result.successful.length > 0){
        createMessage(result.successful)
    }

    if (result.failed.length > 0) {
      console.error("Errors:");
      result.failed.forEach((file) => {
        console.error(file.error);
      });
    }
    uppy.reset()
  });
}
