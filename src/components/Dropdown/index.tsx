import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useRef } from 'react';

interface DropDownProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: JSX.Element | Array<JSX.Element>
    handleClose: () => void
}

const DropDown = ({ children, handleClose, ...rest }: DropDownProps) => {
    let clickOutSideOptionUser = useRef<any>(null);
    clickOutSideOptionUser = useOnClickOutside(() => {
        handleClose();
    });
    return (
        <div ref={clickOutSideOptionUser} className='relative' {...rest}>
            {children}
        </div >
    );
};

export default DropDown;
