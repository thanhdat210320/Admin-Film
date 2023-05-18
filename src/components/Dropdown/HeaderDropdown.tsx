interface DropDownHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: JSX.Element,
    className?: string,
    toggle?: () => void
}
const HeaderDropdown = ({ children, className, toggle, ...rest }: DropDownHeaderProps) => {
    return (
        <div className={`${className}`} {...rest} onClick={() => toggle}>
            {children}
        </div>
    );
};

export default HeaderDropdown;