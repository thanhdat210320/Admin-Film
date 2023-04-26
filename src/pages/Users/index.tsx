import {useState} from 'react'
import DatePicker from 'react-datepicker'
import InputSearchDebounce from 'components/Form/InputSearchDebounce'
import Pagination from 'components/Pagination'
import 'react-datepicker/dist/react-datepicker.css'
import ReactSelect from 'react-select'

const Users = () => {
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	return (
		<>
			<div className="wrapper">
				<div className="wrapper-box">
					<div className="content">
						<div className="intro-y flex items-center mt-8">
							<h2 className="text-lg font-medium mr-auto">Danh sách Users</h2>
						</div>
						<div className="grid grid-cols-24 gap-6 mt-5 overflow-y-auto">
							<div className="intro-y col-span-12 lg:col-span-6">
								{/* BEGIN: Basic Table */}
								<div className="intro-y box">
									<div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60">
										<div className="flex items-center font-medium ">
											<div className="flex items-center gap-5 flex-wrap">
												<div className="flex items-center mr-4">
													<label className="mr-2 ">Ngày đăng kí :</label>
													<div className="max-w-[220px]">
														<DatePicker
															selected={startDate ? new Date(startDate) : null} 
															onChange={(date: any) => setStartDate(date)}
															isClearable
															dateFormat="P"
															locale="vi"
															className="form-control box pr-10 w-36"
															placeholderText="Từ"
														/>
													</div>
													<label className="mx-2"> đến </label>
													<div className="max-w-[220px]">
														<DatePicker
															selected={endDate ? new Date(endDate) : null} 
															onChange={(date: any) => setEndDate(date)}
															isClearable
															dateFormat="P"
															locale="vi"
															clearButtonClassName="pr-10"
															placeholderText="Đến"
															className="form-control box pr-10 w-36"
														/>
													</div>
												</div>

												<div className="flex items-center mr-4">
													<label className="mr-2 ">Điểm :</label>
													<div className="max-w-[220px]">
														<input
															type="number"
															className="form-control box w-[90px]"
															placeholder="Từ"
														/>
													</div>
													<label className="mx-2"> đến : </label>
													<div className="max-w-[220px]">
														<input
															type="number"
															placeholder="Đến"
															className="form-control box w-[90px]"
														/>
													</div>
												</div>
												<div className="flex items-center mr-4">
													<label className="mr-2">Trạng thái : </label>
													<ReactSelect
														options={[
															{ value: 0, label: 'All' },
															{ value: 1, label: 'Bình thường' },
															{ value: 2, label: 'Cấm đặt câu hỏi' },
															{ value: 3, label: 'Cấm trả lời câu hỏi' },
															{ value: 4, label: 'Cấm đặt và trả lời câu hỏi' },
															{ value: 5, label: 'Block' }
														]}
														className="w-36"
														classNamePrefix="select-input__custom "
														isClearable
														placeholder="Chọn"
													/>
												</div>
												<div className="flex items-center mr-4">
													<label className="mr-2">Lớp: </label>
													<ReactSelect
														options={[
															{ value: 0, label: 'All' },
															{ value: 1, label: 'Lớp 1' },
															{ value: 2, label: 'Lớp 2' }
														]}

														className="w-36"
														classNamePrefix="select-input__custom "
														isClearable
														placeholder="Chọn"
													/>
												</div>
												<div className="w-56 relative text-slate-500">
													<InputSearchDebounce
														placeholder="Từ khóa"
														onChange={(value) => null}
														className="form-control box pr-10 w-56 flex-end"
														delay={400}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="p-5" id="basic-table">
										<div className="preview">
											<div className="mt-8 overflow-auto">
												<table className="table">
													<thead className="table-dark">
														<tr className="text-center">
															<th className="whitespace-nowrap">ID</th>
															<th className="whitespace-nowrap">ID/FID</th>
															<th className="whitespace-nowrap">Tên</th>
															<th className="whitespace-nowrap">Ngày đăng kí</th>
															<th className="whitespace-nowrap">Giới tính</th>
															<th className="whitespace-nowrap">Ngày sinh</th>
															<th className="whitespace-nowrap">Lớp</th>
															<th className="whitespace-nowrap">Điểm</th>
															<th className="whitespace-nowrap">Trạng thái hoạt động</th>
															<th className="whitespace-nowrap">Đánh giá sao trung bình</th>
															<th className="whitespace-nowrap">Operation</th>
														</tr>
													</thead>
													<tbody>
														<tr className="text-center">
															<td>1</td>
															<td>12345</td>
															<td>Vinhnv</td>
															<td>13/02/2022</td>
															<td>Nam</td>
															<td>13/02/2000</td>
															<td>1C</td>
															<td>1000 điểm</td>
															<td>Bình thường</td>
															<td>4 sao</td>
															<td><span>Xem chi tiết</span> | <span>Đổi trạng thái</span></td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* END: Content */}
				</div>
			</div>
			<div className="flex justify-between w-full mt-10">
				<Pagination
					pageNumber={1}
					pageSize={1}
					totalRow={1}
					onPageChange={() => null}
					onChangePageSize={() => null}
				/>
			</div>
		</>
	)
}

export default Users