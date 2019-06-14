import EnumEnv from '@/constants/EnumEnv';
const apiPrefix = EnumEnv.apiPrefix || '/';

export const proxyAPI = (api: string) => apiPrefix.replace(/\/$/, "") + "/" + api.replace(/^\//, "");

