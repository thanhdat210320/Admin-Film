import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/error-illustration.svg"

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className="container">
            <div className="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
                <div className="-intro-x lg:mr-20">
                    <img
                        alt="Midone - HTML Admin Template"
                        className="h-48 lg:h-auto"
                        src={logo}
                    />
                </div>
                <div className="text-white mt-10 lg:mt-0">
                    <div className="intro-x text-8xl font-medium">404</div>
                    <div className="intro-x text-xl lg:text-3xl font-medium mt-5">
                        Không tìm thấy trang !
                    </div>
                    <div className="intro-x text-lg mt-3">
                        Bạn có thể đã nhập sai địa chỉ hoặc không có quyền truy cập.
                    </div>
                    <button className="intro-x btn py-3 px-4 text-white border-white dark:border-darkmode-400 dark:text-slate-200 mt-10" onClick={() => navigate("/")}>
                        Về trang chủ
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ErrorPage;
