import { Error, LoginResponse, SignInParams } from "@/models/authentication";
import { CommonResponse } from "@/models/common";
import { postAsync } from "./request";

const authenticationAPI = {
    async signIn(params: SignInParams): Promise<LoginResponse | Error> {
        const url = "/v1/auth/signIn";
        const response = await postAsync(url, params);
        return response.data
    },
    signOut(): Promise<CommonResponse> {
        const url = "/v1/auth/signOut";
        return postAsync(url);
    },
    refreshToken(refreshToken: string): Promise<CommonResponse> {
        const url = "/v1/auth/refresh"
        return postAsync(url, { refresh_token: refreshToken });
    }
};

export default authenticationAPI;
