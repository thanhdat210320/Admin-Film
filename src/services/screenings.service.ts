import { CommonResponse } from "models/common";
import { getAsync, patchAsync, deleteAsync, postAsync } from "./request";

const screeningsAPI = {
	getScreenings(params?: any): Promise<CommonResponse> {
		const url = "/v1/screenings"
		return getAsync(url, params);
	},
	addScreenings( params: any): Promise<CommonResponse> {
		const url = "/v1/screenings"
		return postAsync(url, params);
	},
	updateTicketScreenings(
    id: string,
    params: any
  ): Promise<CommonResponse> {
    const url = `/v1/screenings/${id}`
    return patchAsync(url, params)
  },
	deleteScreenings(
    id: string
  ): Promise<CommonResponse> {
    const url = `/v1/screenings/delete/${id}`
    return deleteAsync(url)
  }
};

export default screeningsAPI;
