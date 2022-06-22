import { HttpException, HttpStatus } from "@nestjs/common";

const HTTPException = (code: number, message: string) => {
    return new HttpException({
        error: message,
        status: code
    }, code)
}

export default HTTPException;