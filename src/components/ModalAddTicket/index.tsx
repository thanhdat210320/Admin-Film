import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect } from "react"
import { toast } from "react-toastify"
import Modal from 'components/Modal'
import userAPI from "@/services/users.service";

const schema = yup.object().shape({
	fullname: yup.string().required("Vui lòng nhập họ tên").max(30, "Họ tên tối đa 30 ký tự!"),
	username: yup.string().required("Vui lòng nhập Username"),
	password: yup.string().required("Vui lòng nhập Password").max(40, "Mật khẩu tối đa 40 ký tự!")
		.min(6, "Mật khẩu tối thiểu 6 ký tự!").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,40})/,
			"Mật khẩu phải có từ 6 đến 32 ký tự, có ký tự chữ số, chữ hoa và chữ thường."),
	email: yup.string().required("Vui lòng nhập Email").max(40, "Email tối đa 40 ký tự!")
		.email("Email không đúng định dạng"),
	phone: yup.string().required("Vui lòng nhập SĐT").max(15, "SDT tối đa 15 ký tự!")
		.matches(/^(84|0[3|5|7|8|9])[0-9]{8,13}$/, {
			message: "Số điện thoại chưa đúng định dạng", excludeEmptyString: true
		})
})

type IProps = {
	showModalAdd: boolean
	setShowModalAdd: React.Dispatch<React.SetStateAction<boolean>>
	callBack: () => void
}

const ModalAddTicket = ({ setShowModalAdd, showModalAdd, callBack }: IProps) => {

	const {
		register,
		handleSubmit,
		formState,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			fullname: '',
			username: '',
			email: '',
			phone: '',
			password: '',
		}
	})

	const { errors, isDirty }: any = formState;

	const addUser = async (data: any) => {
		try {
			const res = await userAPI.addUser({
				name: data?.fullname,
				username: data?.username,
				email: data?.email,
				phoneNumber: data?.phone,
				password: data?.password,
			})
			if (res?.data?.status === 'error') {
				toast.error(res?.data?.message)
			} else {
				callBack && callBack()
				toast.success('Thêm User thành công.')
				setShowModalAdd(false)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		reset({
			fullname: '',
			username: '',
			email: '',
			phone: '',
			password: '',
		})
	}, [ setShowModalAdd, showModalAdd])
	return (
		<Modal
			title="Thêm thông tin User"
			open={showModalAdd}
			handleCancel={() => setShowModalAdd(false)}
			handleConfirm={handleSubmit(addUser)}
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
						<span className="w-[140px] font-medium text-base">Mật khẩu:</span>
						<div className="flex-1">
							<input
								placeholder="Nhập mật khẩu"
								type="text"
								{...register("password")}
								className="form-control w-full"
							/>
						</div>
					</div>
					{errors?.password && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.password?.message}
						</p>
					)}
				</div>


			</div>
		</Modal>
	)
}

export default ModalAddTicket
