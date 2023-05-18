import Modal from 'components/Modal'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputPassword from '../Form/InputPassword'
import { validateConfirmPassword, validateDifferentPassword } from "contants/validate";
import * as yup from "yup";
import { useEffect } from 'react';
import userAPI from '@/services/users.service';
import { toast } from 'react-toastify';

type IProps = {
	changePassword: boolean
	setChangePassword: React.Dispatch<React.SetStateAction<boolean>>
}

type ChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
const schema = yup
  .object({
    newPassword: validateDifferentPassword("oldPassword"),
    confirmNewPassword: validateConfirmPassword("newPassword")
  })
  .required();

const ModalChangePassword = ({ changePassword, setChangePassword }: IProps) => {

	const userID: any = localStorage.getItem('userID')?.replaceAll(`"`, '')

	const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePassword>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

	const handleChangePassword = async (data: any) => {
		try {
			const res = await userAPI.resetPassword(userID, {
				password: data.confirmNewPassword
			})
			setChangePassword(false)
			if (res?.data?.status === 'error') {
				toast.error(res?.data?.message)
			} else {
				toast.success('Thay đổi mật khẩu thành công.')
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
    reset()
  }, [changePassword])

	return (
		<Modal
			title="Đổi mật khẩu"
			open={changePassword}
			handleCancel={() => setChangePassword(false)}
			handleConfirm={handleSubmit(handleChangePassword)}
			className="w-full max-w-[475px]"
		>
			<div className="py-2" >
				<InputPassword
					register={register("newPassword")}
					placeholder="Mật khẩu mới"
					label="Mật khẩu mới"
					error={errors.newPassword}
					classNameInput="login__input form-control"
					className="mb-4"
				/>
				<InputPassword
					register={register("confirmNewPassword")}
					placeholder="Nhập lại mật khẩu mới"
					label="Nhập lại mật khẩu mới"
					error={errors.confirmNewPassword}
					classNameInput="login__input form-control "
				/>
			</div>
		</Modal>
	)
}

export default ModalChangePassword
