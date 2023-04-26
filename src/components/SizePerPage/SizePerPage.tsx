interface ISizePerPage {
  totalItem: number | string
  onChangePerPage: (size: number) => void
  pageSizeDefault: number
}

const SizePerPage = ({
  totalItem,
  onChangePerPage,
  pageSizeDefault
}: ISizePerPage) => {
  return (
    <>
      <div className="flex items-center justify-between w-72">
        <span className="text-sm">Total: {totalItem} records</span>
        <select
          name=""
          id=""
          className="w-42 h-10 text-sm rounded"
          onChange={(e) => {
            onChangePerPage(+e.target.value)
          }}
          defaultValue={pageSizeDefault || 10}
        >
          <option value={10}>10 record/page</option>
          <option value={15}>15 record/page</option>
          <option value={20}>20 record/page</option>
        </select>
      </div>
    </>
  )
}

export default SizePerPage
