import { CommonResponse } from "models/common";
import { getAsync, patchAsync, deleteAsync, postAsync, putAsync } from "./request";

const moviesAPI = {
	getMovies(params?: any): Promise<CommonResponse> {
		const url = "/v1/movies"
		return getAsync(url, params);
	},
	addMovies( params: any): Promise<CommonResponse> {
		const url = "/v1/movies"
		return postAsync(url, params);
	},
	updateMovies(
    id: string,
    params: any
  ): Promise<CommonResponse> {
    const url = `/v1/movies/${id}`
    return putAsync(url, params)
  },
	deleteMovies(
    id: string
  ): Promise<CommonResponse> {
    const url = `/v1/movies/delete/${id}`
    return deleteAsync(url)
  },
	getMoviesBooinges(params?: any): Promise<CommonResponse> {
		const url = "/v1/movies/bookingest"
		return getAsync(url, params);
	},
};

export default moviesAPI;
