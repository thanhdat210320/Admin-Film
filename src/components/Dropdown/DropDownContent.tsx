interface DropDownContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: Array<JSX.Element> | JSX.Element,
    isOpen: boolean,
    className?: string
}
const DropDownContent = ({ children, isOpen, className, ...rest }: DropDownContentProps) => {
    return (
        <div className={`${!isOpen ? "invisible opacity-0 translate-y-10" : "visible opacity-100 translate-y-0"} transition-all  absolute right-0 mt-2 w-56 shadow-md rounded-md overflow-hidden ${className}`} {...rest}>
            <div className="bg-primary/80 text-white before:absolute before:inset-0 before:z-[-1] before:block before:rounded-md before:bg-black">
                <>{children}</>
            </div>
        </div>
    );
};

export default DropDownContent;
