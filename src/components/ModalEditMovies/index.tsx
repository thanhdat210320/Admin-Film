import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from 'components/Modal'
import useQueryParams from "@/hooks/useQueryParams";
import { getCachedData } from "@/utils/storage";
import { ACCESS_TOKEN } from "@/contants/auth";
import axios from "axios";
import cinemasAPI from "@/services/cinemas.service";

type IProps = {
	itemMovies: Object | any
	showModalEdit: boolean
	setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>
	callBack: () => void
}

const schema = yup.object().shape({
	title: yup.string().required("Vui lòng nhập title"),
	descristion: yup.string().required("Vui lòng nhập description"),
	duration: yup.number().typeError("Trường này bắt buộc nhập số").required("Trường này bắt buộc nhập"),
	director: yup.string().required("Vui lòng nhập startDate"),
	cinemaId: yup.string().required("Vui lòng nhập cateId"),
	genre: yup.string().typeError("Trường này bắt buộc nhập số"),
	trailer: yup.string().required("Vui lòng nhập transport")
})

const ModalEditUser = ({ showModalEdit, setShowModalEdit, itemMovies, callBack }: IProps) => {
	const [poster, setPoster] = useState<any>(null);
	const [banner, setBanner] = useState<any>(null);
  const [categories, setCategories] = useState<any>([])
	const [params, setQueryParams] = useQueryParams()
	const { page, limit, category } = params

	const {
		register,
		handleSubmit,
		formState,
		reset
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			title: itemMovies?.title,
			descristion: itemMovies?.descristion,
			duration: itemMovies?.duration,
			director: itemMovies?.director,
			cinemaId: itemMovies?.cinemaId,
			genre: itemMovies?.genre,
			trailer: itemMovies?.trailer
		}
	})

	const { errors, isDirty }: any = formState;
	const accessToken = getCachedData(ACCESS_TOKEN)

	const updatePost = async (data: any) => {
		const formData = new FormData()
		formData.append("title", data.title)
		formData.append("descristion", data.descristion)
		formData.append("duration", data.duration)
		formData.append("banner", banner) //flie của banner
		formData.append("poster", poster) //file của poster
		formData.append("director", data.director)
		formData.append("cinemaId", data.cinemaId)
		formData.append("price", '0')
		formData.append("genre", data.genre)
		formData.append("trailer", data.trailer)
	try {
		const res = await axios({
			method: 'put',
			url: `http://localhost:8228/v1/movies/${itemMovies.id}`,
			headers: {
				Authorization: 'Bearer ' + accessToken, //the token is a variable which holds the token
				"Content-Type": `multipart/form-data; boundary=${formData}`
			},
			data: formData
		})
		//check lại res
		if (res?.data?.status === 'error') {
			toast.error(res?.data?.message)
		} else {
			callBack && callBack()
			toast.success('Thêm phim thành công.')
			setShowModalEdit(false)
			setBanner(null)
			setPoster(null)
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
			title: itemMovies?.title,
			descristion: itemMovies?.descristion,
			duration: itemMovies?.duration,
			director: itemMovies?.director,
			cinemaId: itemMovies?.cinemaId,
			genre: itemMovies?.genre,
			trailer: itemMovies?.trailer
		})
	}, [itemMovies, setShowModalEdit, showModalEdit])
	return (
		<>
			<Modal
				title="Sửa thông tin phim"
				open={showModalEdit}
				handleCancel={() => setShowModalEdit(false)}
				handleConfirm={handleSubmit(updatePost)}
				className="w-full max-w-[775px]"
				confirmButtonTitle="Lưu"
			>
				<div className="flex flex-col">
				<div className="flex justify-between">
				<div className="w-[48%]">
				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">
							Tên phim:
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
							<textarea
								placeholder="Nhập description"
								{...register("descristion")}
								className="form-control w-full"
							/>
						</div>
					</div>
					{errors?.descristion && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.descristion?.message}
						</p>
					)}
				</div>
				<div className="my-2">
					<div className="flex items-center ">
							<label className="w-[140px] font-medium text-base">Rạp chiếu: </label>
							<div className="flex-1">
							<select {...register("cinemaId")} id="crud-form-1" className="form-control w-full" >
									<option value={itemMovies?.cateId} className="hidden" selected >{itemMovies?.cateName}</option>
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
							Chọn banner:
						</span>
						<div className=" w-[69%] flex items-center justify-between">
							<input type="file" accept=".png,.jpeg,.jpg" onChange={(e: any) => {if(e.target.files.length !== 0) setBanner(e?.target?.files[0])}} />
							{banner ? (<><img src={URL.createObjectURL(banner)} className="w-[80px] h-[80px]" alt="" />
								<div className="shareX ml-[10px] cursor-pointer" onClick={() => setBanner(null)}>X</div></>
							): (<img src={`http://localhost:8228/files/${itemMovies?.banner}`} className="w-[80px] h-[80px]" alt="" />)}
						</div>
					</div>
				</div>
				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">
							Chọn poster:
						</span>
						<div className=" w-[69%] flex items-center justify-between">
							<input type="file" accept=".png,.jpeg,.jpg" onChange={(e: any) => {if(e.target.files.length !== 0) setPoster(e?.target?.files[0])}} />
							{poster ? (<><img src={URL.createObjectURL(poster)} className="w-[80px] h-[80px]" alt="" />
								<div className="shareX ml-[10px] cursor-pointer" onClick={() => setPoster(null)}>X</div></>
							) : (<img src={`http://localhost:8228/files/${itemMovies?.poster}`} className="w-[80px] h-[80px]" alt="" />)}
						</div>
					</div>
				</div>

				</div>
				<div className="w-[48%]">


				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">
						 Trailer:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập trailer"
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
						 Thể loại:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập thể loại"
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
						 Diễn viên:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập diễn viên"
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
						 Thời lượng:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập thời lượng"
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
				</div>
			</div>
			</Modal>
		</>
	)
}

export default ModalEditUser
