import { Color } from "./Color";

// api response codes
export const ResponseCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    UNPROCESSABLE_REQUEST: 422,
    INTERNAL_SERVER_ERROR: 500,
    TOKEN_INVALID: 503,
    NO_INTERNET: 522,
    BAD_GATEWAY: 502,
};

const Regex = {
    PASSWORD: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

const MessageType = {
    SUCCESS: 'success',
    FAILED: 'error',
    INFO: 'info',
};

const CustomImagePrompt = `I have attached an image with an object highlighted by a green outline. Please provide a short, informative caption explaining the object and its function. If the object is associated with a company, include a brief caption about the company as well. Describe how the object works and provide a brief history of the object and its use. Highlight potential issues with the object and suggest solutions to resolve them. Discuss possible future advancements in the technology of the object. Include a brief instructional tip on how to use the object effectively.`


const removeMarkdown = (markdownText: string) => {
    // This is a basic implementation. You might need a more robust solution for complex Markdown.
    return markdownText
        .replace(/[*_~`]/g, '') // Remove * _ ~ ` characters
        .replace(/!\[.*\]\(.*\)/g, '') // Remove images
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links but keep the text
        .replace(/#+\s/g, '') // Remove headers
        .replace(/>\s/g, '') // Remove blockquotes
        .replace(/[-+*]\s/g, '') // Remove list bullets
        .replace(/\n/g, ' ') // Replace new lines with spaces
        .replace(/\s{2,}/g, ' '); // Replace multiple spaces with a single space
};

export const SHIMMER_COLOR = ['#27374D', '#526D82', '#27374D'];

export default {
    Regex,
    ResponseCode,
    MessageType,
    CustomImagePrompt,
    removeMarkdown,
    SHIMMER_COLOR
};
