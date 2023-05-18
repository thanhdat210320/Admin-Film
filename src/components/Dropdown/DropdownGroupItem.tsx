
interface DropdownItemParams extends React.HTMLAttributes<HTMLDivElement> {
    children?: Array<JSX.Element> | JSX.Element,
    className?: string,
    lineStyle?: string
}
const DropdownGroupItem = ({ children, className, lineStyle, ...rest }: DropdownItemParams) => {
    return (
        <div className={`${className}`} {...rest}>
            {children}
            <hr className={`border-white/[0.08] ${lineStyle}`} />
        </div>
    );
};

export default DropdownGroupItem;