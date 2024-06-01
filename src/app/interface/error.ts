export type TErrorSource = {
    path: string | number;
    message: string
}[]

export type  TGenenricErrorResponse = {
    statusCode:number;
    message:string;
    errorSource:TErrorSource
}