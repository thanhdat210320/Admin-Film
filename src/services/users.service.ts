import { CommonResponse } from "models/common";
import { getAsync, patchAsync, deleteAsync, postAsync } from "./request";

const userAPI = {
	getUsers(params?: any): Promise<CommonResponse> {
		const url = "/v1/users"
		return getAsync(url, params);
	},
	getProfile(): Promise<CommonResponse> {
		const url = "/v1/users/me"
		return getAsync(url);
	},
	addUser( params: any): Promise<CommonResponse> {
		const url = "/v1/users"
		return postAsync(url, params);
	},
	updateUser(
    id: string,
    params: any
  ): Promise<CommonResponse> {
    const url = `/v1/users/${id}`
    return patchAsync(url, params)
  },
	deleteUser(
    id: string
  ): Promise<CommonResponse> {
    const url = `/v1/users/delete/${id}`
    return deleteAsync(url)
  },
	resetPassword(
    id: string,
		params: any
  ): Promise<CommonResponse> {
    const url = `/v1/users/reset-password/${id}`
    return patchAsync(url, params)
  },
	resetAdminPassword(
		params: any
  ): Promise<CommonResponse> {
    const url = `/v1/users/admin_reset_password`
    return postAsync(url, params)
  }
};

export default userAPI;
