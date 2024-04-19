import multer from "multer";

const multerUpload = multer({
    limit: { fileSize: 1024 * 1024 * 5 },
})

const singleAvatar = multerUpload.single("avatar");
const attachmentsMulter = multerUpload.array("files", 5);

export { multerUpload , singleAvatar, attachmentsMulter};