import { useCallback, useState } from 'react';

const useModal = () => {
    const [show, setShow] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)

    const handleShow = useCallback((data?: any) => { setShow(true); data && setData(data); }, []);
    const handleClose = useCallback(() => { setShow(false); setData({}) }, []);
    return { show, data, handleShow, handleClose }
}

export default useModal;