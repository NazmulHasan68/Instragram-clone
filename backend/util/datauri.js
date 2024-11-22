import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

export const getDataUri = (file) => {
    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file object. Ensure 'originalname' and 'buffer' are provided.");
    }
    const extName = path.extname(file.originalname); // Removed .toString()
    return parser.format(extName, file.buffer).content;
};

