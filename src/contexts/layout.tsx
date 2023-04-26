

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface ILayoutContextProps {
    hasDirtyForm?: boolean,
    handleChangeStatusForm: (value: boolean) => void
}

const LayoutContext = createContext<ILayoutContextProps>({
    handleChangeStatusForm: (value: boolean) => { }
})

export const useLayout = () => useContext(LayoutContext)

export default function LayoutProvider({ children }: { children: JSX.Element }) {
    const [hasDirtyForm, setHasDirtyForm] = useState<boolean>(false)
    const location = useLocation()
    useEffect(() => {
        setHasDirtyForm(false)
    }, [location])

    const handleChangeStatusForm = (dirty: boolean) => {
        setHasDirtyForm(dirty)
    }
    const value = useMemo(
        () => ({
            hasDirtyForm,
            handleChangeStatusForm
        }),
        [hasDirtyForm]
    );
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}
