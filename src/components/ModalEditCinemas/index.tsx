import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from 'components/Modal'
import userAPI from "@/services/users.service";
import { useAuth } from "@/contexts/auth";
import moviesAPI from "@/services/movies.service";
import cinemasAPI from "@/services/cinemas.service";

type IProps = {
	itemCinemas: Object | any
	showModalEdit: boolean
	setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>
	callBack: () => void
}

const schema = yup.object().shape({
	name: yup.string().required("Vui lòng nhập name"),
	address: yup.string().required("Vui lòng nhập address"),
	city:yup.string().required("Vui lòng nhập city"),
})

const ModalEditCinemas = ({ showModalEdit, setShowModalEdit, itemCinemas, callBack }: IProps) => {

	const {
		register,
		handleSubmit,
		formState,
		reset
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: itemCinemas.name,
			address: itemCinemas.address,
			city:itemCinemas.city,
		}
	})

	const { errors, isDirty }: any = formState;

	const updatePost = async (data: any) => {
		try {
			const res = await cinemasAPI.updateCinemas(itemCinemas?.id, {
				name: data.name,
				address: data.address,
				city:data.city,
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
			name: itemCinemas.name,
			address: itemCinemas.address,
			city:itemCinemas.city,
		})
	}, [itemCinemas, setShowModalEdit, showModalEdit])
	return (
		<>
			<Modal
				title="Sửa thông tin phim"
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
						Tên rạp:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập tên rạp"
								type="text"
								{...register("name")}
								className="form-control w-full"
							/>
						</div>
					</div>
					{errors?.name && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.name?.message}
						</p>
					)}
				</div>
				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">
							Địa chỉ:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập địa chỉ"
								type="text"
								{...register("address")}
								className="form-control w-full"
							/>
						</div>
					</div>
					{errors?.address && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.address?.message}
						</p>
					)}
				</div>
				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">
							Thành phố:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập thành phố"
								type="text"
								{...register("city")}
								className="form-control w-full"
							/>
						</div>
					</div>
					{errors?.city && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.city?.message}
						</p>
					)}
				</div>

				</div>
			</Modal>
		</>
	)
}

export default ModalEditCinemas
