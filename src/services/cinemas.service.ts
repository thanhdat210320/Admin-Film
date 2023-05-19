import { CommonResponse } from "models/common";
import { getAsync, patchAsync, deleteAsync, postAsync } from "./request";

const cinemasAPI = {
	getCinemas(params?: any): Promise<CommonResponse> {
		const url = "/v1/cinemas"
		return getAsync(url, params);
	},
	addCinemas( params: any): Promise<CommonResponse> {
		const url = "/v1/cinemas"
		return postAsync(url, params);
	},
	updateCinemas(
    id: string,
    params: any
  ): Promise<CommonResponse> {
    const url = `/v1/cinemas/${id}`
    return patchAsync(url, params)
  },
	deleteCinemas(
    id: string
  ): Promise<CommonResponse> {
    const url = `/v1/cinemas/delete/${id}`
    return deleteAsync(url)
  }
};

export default cinemasAPI;
