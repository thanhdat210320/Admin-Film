import { IObject, RECORDS_PER_PAGE } from "contants";
import { useSearchParams } from "react-router-dom";

const useQueryParams = (): [IObject, (value: IObject, replace?: boolean) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params: IObject = { page: 1, size: RECORDS_PER_PAGE }
    //get params
    for (const entry of searchParams.entries()) {
        const [key, value] = entry;
        if (value != null && value !== '') {
            params[key] = value
        }
    }
    const setQueryParams = (value: IObject, replace?: boolean) => {
        let notEmpty: IObject = {}
        for (const [key, v] of Object.entries(value)) {
            if (replace) {
                if (v != null && v !== '') {
                    notEmpty[key] = v
                }
            } else {
                notEmpty = { ...params }
                if (v != null && v !== '') {
                    notEmpty[key] = v
                } else {
                    delete notEmpty[key]
                }

            }

        }
        if (JSON.stringify(params) !== JSON.stringify(notEmpty)) {
            setSearchParams(notEmpty, { replace: true })
        }
    }
    return [params, setQueryParams]
};

export default useQueryParams;