import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from 'components/Modal'
import userAPI from "@/services/users.service";
import ticketAPI from "@/services/tickets.service";
import ReactSelect from 'react-select';
import useQueryParams from "@/hooks/useQueryParams";
import screeningsAPI from "@/services/screenings.service";

const schema = yup.object().shape({
	screeningId: yup.string().required("Vui lòng nhập seatNumber"),
	seatNumber: yup.string().required("Vui lòng nhập seatNumber"),
	price: yup.string().required("Vui lòng nhập price"),
})

type IProps = {
	itemTicket: Object | any
	showModalEdit: boolean
	setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>
	callBack: () => void
}

const ModalEditTicket = ({ setShowModalEdit, showModalEdit, callBack, itemTicket }: IProps) => {
	const [params, setQueryParams] = useQueryParams()
	const { page, size, cinemaId, screeningId } = params
	const [screenings, setScreenings] = useState<any>([])

	const {
		register,
		handleSubmit,
		formState,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			screeningId: itemTicket.screeningId,
			seatNumber: itemTicket.seatNumber,
			price: itemTicket.price,
		}
	})

	const { errors, isDirty }: any = formState;

	const addUser = async (data: any) => {
		try {
			const res = await ticketAPI.updateTicket(itemTicket.id,{
				screeningId: data.screeningId,
				seatNumber: data.seatNumber,
				price: data.price,
			})
			if (res?.data?.status === 'error') {
				toast.error(res?.data?.message)
			} else {
				callBack && callBack()
				toast.success('Thêm User thành công.')
				setShowModalEdit(false)
			}
		} catch (error) {
			console.log(error)
		}
	}


	const getDataListScreenings = async () => {
		try {
		  const data = await screeningsAPI.getScreenings({size: 999})
		  setScreenings(data?.data?.data)
		} catch (error) {
		  console.log(error)
		}
	  }

		useEffect(() => {
			getDataListScreenings()
		},[])

	useEffect(() => {
		reset({
			screeningId: itemTicket.screeningId,
			seatNumber: itemTicket.seatNumber,
			price: itemTicket.price
		})
	}, [ setShowModalEdit, showModalEdit])
	return (
		<Modal
			title="Thêm thông tin User"
			open={showModalEdit}
			handleCancel={() => setShowModalEdit(false)}
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
								type="text"
								{...register("screeningId")}
								className="form-control w-full"
								disabled
							/>
						</div>
					</div>
					{errors?.screeningId && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.screeningId?.message}
						</p>
					)}
				</div>
				<div className="my-2">
					<div className="flex items-center">
						<span className="w-[140px] font-medium text-base">
						seatNumber:
						</span>
						<div className="flex-1">
							<input
								placeholder="Nhập seatNumber"
								type="text"
								{...register("seatNumber")}
								className="form-control w-full"
							/>
						</div>
					</div>
					{errors?.seatNumber && (
						<p className="text-sm text-red-700 mt-1 ml-1 m-auto pl-[140px]">
							{errors?.seatNumber?.message}
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
			</div>
		</Modal>
	)
}

export default ModalEditTicket
