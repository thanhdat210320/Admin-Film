import { createContext, useContext, useMemo, useState } from 'react';

interface IBreadcrumbContextProps {
  textBreadcrumb: string;
  setTextBreadcrumb: React.Dispatch<React.SetStateAction<string>>;
}

const BreadcrumbContext = createContext<IBreadcrumbContextProps>({
    textBreadcrumb: '',
    setTextBreadcrumb: () => {},
})

export const useBreadcrumb = () => useContext(BreadcrumbContext)

export default function BreadcrumbProvider({ children }: { children: JSX.Element }) {
  const [textBreadcrumb, setTextBreadcrumb] = useState<string>('')

  const value = useMemo(
    () => ({
      textBreadcrumb,
      setTextBreadcrumb
    }),
    [textBreadcrumb]
  );
  return <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>
}
