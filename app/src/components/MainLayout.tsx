import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  breadcrumb?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageTitle = 'Dashboard' }) => {

  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

    useEffect(() => {
      if (isSidebarOpen) {
        document.body.classList.remove('sb-sidenav-toggled');
      } else {
        document.body.classList.add('sb-sidenav-toggled');
      }
  
      return () => {
        document.body.classList.remove('sb-sidenav-toggled');
      };
    }, [isSidebarOpen]);

    
  return (
    <div id="layoutSidenav">
      {/* Sidebar */}
      <div id="layoutSidenav_nav">
        <Sidebar />
      </div>

      {/* Main content */}
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            {/* Title */}
            <h1 className="mt-4">{pageTitle}</h1>

            {/* Breadcrumb */}
            <Breadcrumb />

            {/* Content */}
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;