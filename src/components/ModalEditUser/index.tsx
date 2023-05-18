import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from 'components/Modal'
import userAPI from "@/services/users.service";
import { useAuth } from "@/contexts/auth";

type IProps = {
	itemUser: Object | any
	showModalEdit: boolean
	setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>
	callBack: () => void
}

const schema = yup.object().shape({
	fullname: yup.string().required("Vui lòng nhập họ tên").max(30, "Họ tên tối đa 30 ký tự!"),
	username: yup.string().required("Vui lòng nhập Username"),
	password: yup.string(),
	email: yup.string().required("Vui lòng nhập Email").max(40, "Email tối đa 40 ký tự!")
		.email("Email không đúng định dạng"),
	phone: yup.string().required("Vui lòng nhập SĐT").max(15, "SDT tối đa 15 ký tự!")
		.matches(/^(84|0[3|5|7|8|9])[0-9]{8,13}$/, {
			message: "Số điện thoại chưa đúng định dạng", excludeEmptyString: true
		}),
	role: yup.string().required("Trường này bắt buộc nhập"),
})

const ModalEditUser = ({ showModalEdit, setShowModalEdit, itemUser, callBack }: IProps) => {

	const {
		register,
		handleSubmit,
		formState,
		reset
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			fullname: itemUser?.name,
			username: itemUser?.username,
			email: itemUser?.email,
			phone: itemUser?.phoneNumber,
			role: itemUser?.role,
		}
	})

	const { errors, isDirty }: any = formState;

	const updatePost = async (data: any) => {
		try {
			const res = await userAPI.updateUser(itemUser?.id, {
				name: data?.fullname,
				username: data?.username,
				email: data?.email,
				phoneNumber: data?.phone,
				role: data?.role,
				active: true
			})
			setShowModalEdit(false)
			if (res?.data?.status === 'error') {
				toast.error(res?.data?.message)
			} else {
				callBack && callBack()
				toast.success('Lưu thông tin thành công.')
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		reset({
			fullname: itemUser?.name,
			username: itemUser?.username,
			email: itemUser?.email,
			phone: itemUser?.phoneNumber,
			role: itemUser?.role,
		})
	}, [itemUser, setShowModalEdit, showModalEdit])
	return (
		<>
			<Modal
				title="Sửa thông tin User"
				open={showModalEdit}
				handleCancel={() => setShowModalEdit(false)}
				handleConfirm={handleSubmit(updatePost)}
				className="w-full max-w-[475px]"
				confirmButtonTitle="Lưu"
			>
				<div className="flex flex-col">
					<div className="my-2">
						<div className="flex items-center">
							<span className="w-[140px] font-medium text-base">
								Họ tên:
							</span>
							<div className="flex-1">
								<input
									placeholder="Nhập họ và tên"
									type="text"
									{...register("fullname")}
									className="form-control w-full"
								/>
							</div>
						</div>
						{errors?.fullname && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.fullname?.message}
							</p>
						)}
					</div>
					<div className="my-2">
						<div className="flex items-center">
							<span className="w-[140px] font-medium text-base">
								Username:
							</span>
							<div className="flex-1">
								<input
									placeholder="Nhập Username"
									type="text"
									{...register("username")}
									className="form-control w-full"
									disabled={true}
								/>
							</div>
						</div>
						{errors?.username && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.username?.message}
							</p>
						)}
					</div>
					<div className="my-2">
						<div className="flex items-center">
							<span className="w-[140px] font-medium text-base">
								Email:
							</span>
							<div className="flex-1">
								<input
									placeholder="Nhập Email"
									type="text"
									{...register("email")}
									className="form-control w-full"
								/>
							</div>
						</div>
						{errors?.email && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.email?.message}
							</p>
						)}
					</div>
					<div className="my-2">
						<div className="flex items-center">
							<span className="w-[140px] font-medium text-base">SĐT:</span>
							<div className="flex-1">
								<input
									placeholder="Nhập số điện thoại"
									type="text"
									{...register("phone")}
									className="form-control w-full"
								/>
							</div>
						</div>
						{errors?.phone && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.phone?.message}
							</p>
						)}
					</div>

					<div className="my-2">
						<div className="flex items-center">
							<span className="w-[140px] font-medium text-base">ROLE:</span>
							<div className="flex-1">
								<select {...register("role")} id="crud-form-1" className="form-control w-full" >
									<option  className="hidden" selected ></option>

												<option value="ADMIN">ADMIN</option>
												<option value="USER">USER</option>

								</select>
							</div>
						</div>
						{errors?.role && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.role?.message}
							</p>
						)}
					</div>

				</div>
			</Modal>
		</>
	)
}

export default ModalEditUser
