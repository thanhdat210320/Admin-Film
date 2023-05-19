import { CommonResponse } from "models/common";
import { getAsync, patchAsync, deleteAsync, postAsync } from "./request";

const ticketAPI = {
	getTicket(params?: any): Promise<CommonResponse> {
		const url = "/v1/tickets"
		return getAsync(url, params);
	},
	addTicket( params: any): Promise<CommonResponse> {
		const url = "/v1/tickets"
		return postAsync(url, params);
	},
	updateTicket(
    id: string,
    params: any
  ): Promise<CommonResponse> {
    const url = `/v1/tickets/${id}`
    return patchAsync(url, params)
  },
	deleteTicket(
    id: string
  ): Promise<CommonResponse> {
    const url = `/v1/tickets/delete/${id}`
    return deleteAsync(url)
  }
};

export default ticketAPI;
