import { HTTP_STATUS } from 'src/enum';
import { Response } from 'express';

export class HTTPResponse {
    public content: {};
    public code: HTTP_STATUS;

    constructor(content: {} = null, code: HTTP_STATUS = HTTP_STATUS.CODE_200_OK) {
        this.content = content;
        this.code = code;
    }

    public sendResponse(response: Response) {
        response.status(this.code);
        response.json(this.content);
    }
}