import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";
import { useAuth } from "@hooks/useAuth";

const PublicRoute = () => {
    const { isAuthenticated } = useAuth();

    const backgroundColor = useSelector((state: RootState) => state.background.color);

    useEffect(() => {
        document.body.classList.add(backgroundColor);
        return () => {
            document.body.classList.remove(backgroundColor);
        };
    }, [backgroundColor]);

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <Outlet />
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <Footer />
                </div>
            </div>
        </>
    )
};

export default PublicRoute;