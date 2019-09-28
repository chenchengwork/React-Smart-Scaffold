declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';


declare module "locallyjs"
declare module "is-equal"{
    export default function isEqual(value: any, other: any): boolean;
}

declare interface StrToAnyObj {
    [index: string]: any
}
