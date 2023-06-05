import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from 'components/Modal'
import userAPI from "@/services/users.service";
import moviesAPI from "@/services/movies.service";
import cinemasAPI from "@/services/cinemas.service";
import ReactSelect from 'react-select';
import useQueryParams from "@/hooks/useQueryParams";
import screeningsAPI from "@/services/screenings.service";

const schema = yup.object().shape({
	cinemaId: yup.string().required("Vui lòng nhập name"),
	movieId: yup.string().required("Vui lòng nhập name"),
	name: yup.string().required("Vui lòng nhập name"),
	startTime:yup.string().required("Vui lòng nhập trailer"),
	endTime: yup.string().required("Vui lòng nhập duration")
})

type IProps = {
	showModalEdit: boolean
	setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>
	callBack: () => void
	itemScreenings: Object | any
}

const ModalEditScreenings = ({ setShowModalEdit, showModalEdit, callBack, itemScreenings }: IProps) => {
  const [movies, setMovies] = useState<any>([]);
  const [categories, setCategories] = useState<any>([])
	const [params, setQueryParams] = useQueryParams()
	const { page, size, cinemaId, movieId } = params

	const {
		register,
		handleSubmit,
		formState,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			cinemaId:itemScreenings.cinemaId,
			movieId:itemScreenings.movieId,
			name: itemScreenings.name,
			startTime: itemScreenings.startTime,
			endTime: itemScreenings.endTime
		}
	})

	const { errors, isDirty }: any = formState;

	const addScreen = async (data: any) => {
		try {
			const res = await screeningsAPI.updateScreenings(itemScreenings.id,{
				name: data.name,
				movieId: itemScreenings.movieId,
				cinemaId: itemScreenings.cinemaId,
				startTime: data.startTime,
				endTime: data.endTime,
			})
			if (res?.data?.status === 'error') {
				toast.error(res?.data?.message)
			} else {
				callBack && callBack()
				toast.success('Thêm phim thành công.')
				setShowModalEdit(false)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getDataListCinemas = async () => {
		try {
		  const data = await cinemasAPI.getCinemas({size: 999})
		  setCategories(data?.data?.data)
		} catch (error) {
		  console.log(error)
		}
	  }

		const getDataListMovies = async () => {
			try {
				const data = await moviesAPI.getMovies({cinemaId, page, size})
				setMovies(data?.data?.data)
			} catch (error) {
				console.log(error)
			}
			}

		useEffect(() => {
			if(cinemaId) {
			getDataListMovies()
			}
		},[cinemaId])

	  useEffect(() => {
			getDataListCinemas()
	},[])

	useEffect(() => {
		reset({
			cinemaId:itemScreenings.cinemaId,
			movieId:itemScreenings.movieId,
			name: itemScreenings.name,
			startTime: itemScreenings.startTime,
			endTime: itemScreenings.endTime
		})
	}, [ setShowModalEdit, showModalEdit])
	return (
		<Modal
			title="Sửa thông tin phim"
			open={showModalEdit}
			handleCancel={() => setShowModalEdit(false)}
			handleConfirm={handleSubmit(addScreen)}
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
					<div className="flex items-center ">
							<label className="w-[140px] font-medium text-base">Loại tour: </label>
							<div className="flex-1">
							<input
								type="text"
								{...register("cinemaId")}
								className="form-control w-full"
								disabled
							/>
						</div>
						</div>
						{errors?.cinemaId && (
							<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
								{errors?.cinemaId?.message}
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
								type="text"
								{...register("movieId")}
								className="form-control w-full"
								disabled
							/>
						</div>
					</div>
					{errors?.movieId && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.movieId?.message}
						</p>
					)}
				</div>
				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">Độ dài:</span>
						<div className="flex-1">
							<input
								placeholder="Nhập Độ dài phim"
								type="time"
								{...register("startTime")}
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
						<span className="w-[140px] font-medium text-base">Độ dài:</span>
						<div className="flex-1">
							<input
								placeholder="Nhập Độ dài phim"
								type="time"
								{...register("endTime")}
								className="form-control w-full"
							/>
						</div>
					</div>
					{errors?.endTime && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.endTime?.message}
						</p>
					)}
				</div>



			</div>
		</Modal>
	)
}

export default ModalEditScreenings
