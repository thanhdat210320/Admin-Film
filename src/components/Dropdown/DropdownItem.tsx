
interface DropdownItemParams extends React.HTMLAttributes<HTMLDivElement> {
    children?: JSX.Element | string | Array<JSX.Element>,
    className?: string
    onClick?: () => void
}
const DropdownItem = ({ children, className, onClick, ...rest }: DropdownItemParams) => {
    return (
        <div className={`cursor-pointer hover:bg-white/5 p-2 px-4 ${className}`} {...rest} onClick={onClick}>
            {children}
        </div>
    );
};

export default DropdownItem;