import { CommonResponse } from 'models/common'
import axiosClient from './axiosClient'

export async function postAsync(
  url: string,
  body?: any,
  config = {}
): Promise<CommonResponse> {
  let response
  try {
    response = await axiosClient(url, {
      method: 'POST',
      data: body,
      ...config
    })
    return Promise.resolve({
      status: response?.data?.status,
      data: response?.data?.data,
      message: '',
      statusCode: response?.data?.statusCode
    })
  } catch (ex: any) {
    const { data = {} } = ex?.response || {}
    return Promise.resolve({
      status: data?.status,
      data: data?.data,
      message: data?.message,
      statusCode: data?.statusCode
    })
  }
}

export async function getAsync(
  url: string,
  params?: any
): Promise<CommonResponse> {
  try {
    const response = await axiosClient(url, {
      method: 'GET',
      params
    })
    return Promise.resolve({
      status: response?.data?.status,
      data: response?.data?.data,
      message: '',
      statusCode: response?.data?.statusCode
    })
  } catch (ex: any) {
    const { data = {} } = ex?.response || {}
    return Promise.resolve({
      status: data?.status,
      data: data?.data,
      message: data?.message,
      statusCode: data?.statusCode
    })
  }
}

export async function deleteAsync(url: string): Promise<CommonResponse> {
  try {
    const response = await axiosClient(url, {
      method: 'DELETE',
    })
    return Promise.resolve({
      status: response?.data?.status,
      data: response?.data?.data,
      message: '',
      statusCode: response?.data?.statusCode
    })
  } catch (ex: any) {
    const { data = {} } = ex?.response || {}
    return Promise.resolve({
      status: data?.status,
      data: data?.data,
      message: data?.message,
      statusCode: data?.statusCode
    })
  }
}
export async function putAsync(
  url: string,
  data?: any,
  config = {}
): Promise<CommonResponse> {
  let response
  try {
    response = await axiosClient(url, {
      method: 'PUT',
      data,
      ...config
    })
    return Promise.resolve({
      status: response?.data?.status,
      data: response?.data?.data,
      message: '',
      statusCode: response?.data?.statusCode
    })
  } catch (ex: any) {
    const { data = {} } = ex?.response || {}
    return Promise.resolve({
      status: data?.status,
      data: data?.data,
      message: data?.message,
      statusCode: data?.statusCode
    })
  }
}
export async function patchAsync(
  url: string,
  data?: any,
  config = {}
): Promise<CommonResponse> {
  let response
  try {
    response = await axiosClient(url, {
      method: 'PATCH',
      data,
      ...config
    })
    return Promise.resolve({
      status: response?.data?.status,
      data: response?.data?.data,
      message: '',
      statusCode: response?.data?.statusCode
    })
  } catch (ex: any) {
    const { data = {} } = ex?.response || {}
    return Promise.resolve({
      status: data?.status,
      data: data?.data,
      message: data?.message,
      statusCode: data?.statusCode
    })
  }
}
