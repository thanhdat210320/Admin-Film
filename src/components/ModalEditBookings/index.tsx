import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from 'components/Modal'
import moviesAPI from "@/services/movies.service";

type IProps = {
	itemBookings: Object | any
	showModalEdit: boolean
	setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>
	callBack: () => void
}

const schema = yup.object().shape({
	title: yup.string().required("Vui lòng nhập title"),
	genre: yup.string().required("Vui lòng nhập genre"),
	trailer:yup.string().required("Vui lòng nhập trailer"),
	duration: yup.string().required("Vui lòng nhập duration")
})

const ModalEditBookings = ({ showModalEdit, setShowModalEdit, itemBookings, callBack }: IProps) => {

	const {
		register,
		handleSubmit,
		formState,
		reset
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			title: itemBookings?.title,
			genre: itemBookings?.genre,
			trailer: itemBookings?.trailer,
			duration: itemBookings?.duration,
		}
	})

	const { errors, isDirty }: any = formState;

	const updatePost = async (data: any) => {
		try {
			const res = await moviesAPI.updateMovies(itemBookings?.id, {
				title: data?.title,
				genre: data?.genre,
				trailer: data?.trailer,
				duration: data?.duration,
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
			title: itemBookings?.title,
			genre: itemBookings?.genre,
			trailer: itemBookings?.trailer,
			duration: itemBookings?.duration,
		})
	}, [itemBookings, setShowModalEdit, showModalEdit])
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
								Tên phim:
							</span>
							<div className="flex-1">
								<input
									placeholder="Nhập tên phim"
									type="text"
									{...register("title")}
									className="form-control w-full"
								/>
							</div>
						</div>
						{errors?.title && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.title?.message}
							</p>
						)}
					</div>
					<div className="my-2">
						<div className="flex items-center">
							<span className="w-[140px] font-medium text-base">
								Thể loại:
							</span>
							<div className="flex-1">
								<input
									placeholder="Nhập Thể loại"
									type="text"
									{...register("genre")}
									className="form-control w-full"
								/>
							</div>
						</div>
						{errors?.genre && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.genre?.message}
							</p>
						)}
					</div>
					<div className="my-2">
						<div className="flex items-center">
							<span className="w-[140px] font-medium text-base">
							Trailer:
							</span>
							<div className="flex-1">
								<input
									placeholder="Nhập Trailer"
									type="text"
									{...register("trailer")}
									className="form-control w-full"
								/>
							</div>
						</div>
						{errors?.trailer && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.trailer?.message}
							</p>
						)}
					</div>
					<div className="my-2">
						<div className="flex items-center">
							<span className="w-[140px] font-medium text-base">Độ dài:</span>
							<div className="flex-1">
								<input
									placeholder="Nhập Độ dài"
									type="text"
									{...register("duration")}
									className="form-control w-full"
								/>
							</div>
						</div>
						{errors?.duration && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.duration?.message}
							</p>
						)}
					</div>

				</div>
			</Modal>
		</>
	)
}

export default ModalEditBookings
