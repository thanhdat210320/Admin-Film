export interface IBreadcrumbProps {}

export default function Breadcrumb(props: IBreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="-intro-x mr-auto h-full">
      <ol className="breadcrumb breadcrumb-light">
        <li className="breadcrumb-item">
          <a href="#">Application</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Dashboard
        </li>
      </ol>
    </nav>
  )
}
