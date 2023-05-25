import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from 'components/Modal'
import userAPI from "@/services/users.service";
import { useAuth } from "@/contexts/auth";
import moviesAPI from "@/services/movies.service";

type IProps = {
	itemMovies: Object | any
	showModalEdit: boolean
	setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>
	callBack: () => void
}

const schema = yup.object().shape({
	title: yup.string().required("Vui lòng nhập title"),
	genre: yup.string().required("Vui lòng nhập genre"),
	poster: yup.string().required("Vui lòng nhập poster"),
	banner: yup.string().required("Vui lòng nhập banner"),
	trailer:yup.string().required("Vui lòng nhập trailer"),
	duration: yup.string().required("Vui lòng nhập duration")
})

const ModalEditUser = ({ showModalEdit, setShowModalEdit, itemMovies, callBack }: IProps) => {

	const {
		register,
		handleSubmit,
		formState,
		reset
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			title: itemMovies?.title,
			genre: itemMovies?.genre,
			poster: itemMovies.poster,
			banner: itemMovies.banner,
			trailer: itemMovies?.trailer,
			duration: itemMovies?.duration,
		}
	})

	const { errors, isDirty }: any = formState;

	const updatePost = async (data: any) => {
		try {
			const res = await moviesAPI.updateMovies(itemMovies?.id, {
				title: data?.title,
				genre: data?.genre,
				poster: data?.poster,
				banner: data?.banner,
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
			title: itemMovies?.title,
			genre: itemMovies?.genre,
			poster: itemMovies.poster,
			banner: itemMovies.banner,
			trailer: itemMovies?.trailer,
			duration: itemMovies?.duration,
		})
	}, [itemMovies, setShowModalEdit, showModalEdit])
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
					<div className="my-2">
						<div className="flex items-center">
							<span className="w-[140px] font-medium text-base">Poster:</span>
							<div className="flex-1">
								<input
									placeholder="Nhập Poster"
									type="text"
									{...register("poster")}
									className="form-control w-full"
								/>
							</div>
						</div>
						{errors?.poster && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.poster?.message}
							</p>
						)}
					</div>
					<div className="my-2">
						<div className="flex items-center">
							<span className="w-[140px] font-medium text-base">Banner:</span>
							<div className="flex-1">
								<input
									placeholder="Nhập Banner"
									type="text"
									{...register("banner")}
									className="form-control w-full"
								/>
							</div>
						</div>
						{errors?.banner && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.banner?.message}
							</p>
						)}
					</div>

				</div>
			</Modal>
		</>
	)
}

export default ModalEditUser
