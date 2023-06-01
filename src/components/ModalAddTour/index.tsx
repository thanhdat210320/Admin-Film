import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from 'components/Modal'
import moviesAPI from "@/services/movies.service";
import cinemasAPI from "@/services/cinemas.service";
import useQueryParams from "@/hooks/useQueryParams";

const schema = yup.object().shape({
	title: yup.string().required("Vui lòng nhập title"),
	description: yup.string().required("Vui lòng nhập description"),
	duration: yup.number().typeError("Trường này bắt buộc nhập số").required("Trường này bắt buộc nhập"),
	director: yup.string().required("Vui lòng nhập startDate"),
	banner: yup.string().required("Vui lòng nhập endDate"),
	cinemaId: yup.string().required("Vui lòng nhập cateId"),
	genre: yup.number().typeError("Trường này bắt buộc nhập số").required("Trường này bắt buộc nhập"),
	poster: yup.string().required("Vui lòng nhập transport"),
	trailer: yup.string().required("Vui lòng nhập transport"),
	price: yup.string().required("Vui lòng nhập price"),
})

type IProps = {
	showModalAdd: boolean
	setShowModalAdd: React.Dispatch<React.SetStateAction<boolean>>
	callBack: () => void
}

const ModalAddTour = ({ setShowModalAdd, showModalAdd, callBack }: IProps) => {
	const [poster, setPoster] = useState<any>(null);
	const [banner, setBanner] = useState<any>(null);
  const [categories, setCategories] = useState<any>([])
	const [params, setQueryParams] = useQueryParams()
	const { page, limit, category } = params

	const {
		register,
		handleSubmit,
		formState,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			title: '',
			description: '',
			duration: '',
			director: '',
			banner: '',
			cinemaId: '',
			genre: '',
			poster: '',
			trailer: '',
			price: '',
		}
	})

	const { errors, isDirty }: any = formState;

	const addTour = async (data: any) => {
		try {
			const res = await moviesAPI.addMovies({
				title: data?.title,
				description: data?.description,
				duration: data?.duration,
				director: data?.director,
				banner: data?.banner,
				cinemaId: data?.cinemaId,
				genre: data?.genre,
				poster: data?.poster,
				trailer: data?.trailer,
				price: data?.price
			})
			if (res?.data?.status === 'error') {
				toast.error(res?.data?.message)
			} else {
				callBack && callBack()
				toast.success('Thêm loại tour thành công.')
				setShowModalAdd(false)
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

	  useEffect(() => {
			getDataListCinemas()
	},[])

	useEffect(() => {
		reset({
			title: '',
			description: '',
			duration: '',
			director: '',
			banner: '',
			cinemaId: '',
			genre: '',
			poster: '',
			trailer: '',
			price: '',
		})
	}, [ setShowModalAdd, showModalAdd])
	return (
		<Modal
			title="Thêm thông tin tour"
			open={showModalAdd}
			handleCancel={() => setShowModalAdd(false)}
			handleConfirm={handleSubmit(addTour)}
			className="w-full max-w-[475px]"
			confirmButtonTitle="Lưu"
		>
			<div className="flex flex-col">
				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">
							Tên tour:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập tên"
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
						Description:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập description"
								type="text"
								{...register("description")}
								className="form-control w-full"
							/>
						</div>
					</div>
					{errors?.description && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.description?.message}
						</p>
					)}
				</div>
				<div className="my-2">
					<div className="flex items-center ">
							<label className="w-[140px] font-medium text-base">Loại tour: </label>
							<div className="flex-1">
							<select {...register("cinemaId")} id="crud-form-1" className="form-control w-full">
							<option value="" className="hidden" selected >Nhập rạp chiếu</option>
									{
										categories?.map((cate: any) => (
												<option key={cate?.id} value={cate?.id}>{cate?.name}</option>
										))
									}
								</select>
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
						  Thời gian kết thúc:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập thời gian kết thúc"
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
						<span className="w-[140px] font-medium text-base">
						 Giá tiền:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập giá tiền"
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
				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">
						 Giá tiền:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập giá tiền"
								type="text"
								{...register("price")}
								className="form-control w-full"
							/>
						</div>
					</div>
					{errors?.price && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.price?.message}
						</p>
					)}
				</div>


				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">
						 Giá tiền:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập giá tiền"
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
						<span className="w-[140px] font-medium text-base">
						 Giá tiền:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập giá tiền"
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
						 Giá tiền:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập giá tiền"
								type="text"
								{...register("director")}
								className="form-control w-full"
							/>
						</div>
					</div>
					{errors?.director && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.director?.message}
						</p>
					)}
				</div>
				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">
						 Giá tiền:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập giá tiền"
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
	)
}

export default ModalAddTour
