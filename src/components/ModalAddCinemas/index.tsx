import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect } from "react"
import { toast } from "react-toastify"
import Modal from 'components/Modal'
import userAPI from "@/services/users.service";
import moviesAPI from "@/services/movies.service";

const schema = yup.object().shape({
	title: yup.string().required("Vui lòng nhập title"),
	genre: yup.string().required("Vui lòng nhập genre"),
	trailer:yup.string().required("Vui lòng nhập trailer"),
	duration: yup.string().required("Vui lòng nhập duration")
})

type IProps = {
	showModalAdd: boolean
	setShowModalAdd: React.Dispatch<React.SetStateAction<boolean>>
	callBack: () => void
}

const ModalAddCinemas = ({ setShowModalAdd, showModalAdd, callBack }: IProps) => {

	const {
		register,
		handleSubmit,
		formState,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			title: '',
			genre: '',
			trailer: '',
			duration: ''
		}
	})

	const { errors, isDirty }: any = formState;

	const addUser = async (data: any) => {
		try {
			const res = await moviesAPI.addMovies({
				title: data?.title,
				genre: data?.genre,
				trailer: data?.trailer,
				duration: data?.duration,
				director: 'ok'
			})
			if (res?.data?.status === 'error') {
				toast.error(res?.data?.message)
			} else {
				callBack && callBack()
				toast.success('Thêm phim thành công.')
				setShowModalAdd(false)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		reset({
			title: '',
			genre: '',
			trailer: '',
			duration: ''
		})
	}, [ setShowModalAdd, showModalAdd])
	return (
		<Modal
			title="Thêm thông tin phim"
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
								placeholder="Nhập Độ dài phim"
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

export default ModalAddCinemas
