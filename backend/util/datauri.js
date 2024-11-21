import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

export const getDataUri = (file) => {
    try {
        if (!file?.originalname || !file?.buffer) {
            throw new Error("Invalid file object");
        }
        const extName = path.extname(file.originalname).toString();
        return parser.format(extName, file.buffer).content;
    } catch (error) {
        console.error("Error generating Data URI:", error.message);
        return null; 
    }
};
