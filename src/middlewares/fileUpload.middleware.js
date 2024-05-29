
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadDir = './uploadsUserProfile/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Configure storage with filename and location
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname.replace(/\s/g, '_'); // Replace spaces with underscores
        const extension = path.extname(originalName);
        const baseName = path.basename(originalName, extension);
        cb(null, `${baseName}_${timestamp}${extension}`);
    },
});

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept file only if it is of valid type
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Invalid file type'));
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB limit
    },
});