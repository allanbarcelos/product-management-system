import { useAuth } from "@hooks/useAuth";
import { RouteHandle } from "interfaces/RouteHandle";
import { useEffect } from "react";
import { Navigate, Outlet, useMatches } from "react-router-dom";
import Header from "./Header";
import MainLayout from "./MainLayout";

const PrivateRoute = () => {
    const { isAuthenticated, user, isLoading } = useAuth();
    const matches = useMatches();

    useEffect(() => {
        document.body.classList.add('sb-nav-fixed');
        return () => {
            document.body.classList.remove('sb-nav-fixed');
        };
    }, []);

    if (isLoading) {
        return <div>Carregando...</div>; // Ou um spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    const currentMatch = matches.find((match) => match.handle);

    const { roles } = (currentMatch?.handle as RouteHandle) || { roles: [] };

    if (roles && !roles.some((role) => user?.roles.includes(role))) {
        return <Navigate to="/unauthorized" />;
    }

    const { title, breadcrumb } = (currentMatch?.handle as RouteHandle) || {
        title: 'Page not found',
        breadcrumb: 'Error',
    };

    return (
        <>
            <Header />
            <MainLayout pageTitle={title} breadcrumb={breadcrumb}>
                <Outlet />
            </MainLayout>
        </>
    );
};

export default PrivateRoute;