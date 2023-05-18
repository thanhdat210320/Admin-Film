import DropDown from '@/components/Dropdown'
import DropDownContent from '@/components/Dropdown/DropDownContent'
import DropdownItem from '@/components/Dropdown/DropdownItem'
import HeaderDropdown from '@/components/Dropdown/HeaderDropdown'
import Modal from '@/components/Modal'
import useModal from '@/hooks/useModal'
import { useAuth } from 'contexts/auth'
import { useLayout } from 'contexts/layout'
import { useState } from 'react'
import logo from '@/assets/images/logo-fqa.svg'
import ModalChangePassword from '@/components/ModalChangePassword'
export interface IAccountMenuProps { }

export default function AccountMenu(props: IAccountMenuProps) {
	const [openDropdown, setOpenDropdown] = useState<boolean>(false)
	const [changePassword, setChangePassword] = useState<boolean>(false)
	const { show: logoutModal,
		handleShow: handleShowLogoutModal,
		handleClose: handleCloseLogoutModal
	} = useModal()
	const { hasDirtyForm } = useLayout()
	const { signOut } = useAuth()

	return (
		<>
			<Modal
				title="Đăng xuất"
				open={logoutModal}
				handleCancel={handleCloseLogoutModal}
				handleConfirm={signOut}
			>
				{hasDirtyForm ? "Nếu thoát ngay bây giờ thì các thông tin sẽ không được lưu." : "Bạn chắc chắn muốn đăng xuất ?"}
			</Modal>
			<ModalChangePassword
				changePassword={changePassword}
				setChangePassword={setChangePassword}
			/>
			<div className="intro-x dropdown w-8 h-8">
				<DropDown handleClose={() => setOpenDropdown(false)}>
					<HeaderDropdown toggle={() => setOpenDropdown(x => !x)}>
						<>
							<div
								className="zoom-in h-8 w-8 bg-[antiquewhite] text-black uppercase scale-110 overflow-hidden rounded-full shadow-lg flex items-center justify-center text-2xl "
								onClick={() => setOpenDropdown(x => !x)}
							>
								<img src={logo} alt="" />
							</div>
						</>
					</HeaderDropdown>
					<DropDownContent isOpen={openDropdown}>
						<DropdownItem onClick={() => setChangePassword(true)}>Đổi mật khẩu</DropdownItem>
						<DropdownItem onClick={() => { setOpenDropdown(false); handleShowLogoutModal() }}>Đăng xuất</DropdownItem>
					</DropDownContent>
				</DropDown>
			</div>
		</>
	)
}
