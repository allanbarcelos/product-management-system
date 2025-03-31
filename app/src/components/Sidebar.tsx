import { faAngleDown, faBookOpen, faChartArea, faColumns, faTable, faTachometer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@hooks/useAuth";

const Sidebar = () => {

    const { user } = useAuth();
    
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    {/* Core Section */}
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <a className="nav-link" href="index.html">
                        <div className="sb-nav-link-icon">
                            <FontAwesomeIcon icon={faTachometer} />
                        </div>
                        Dashboard
                    </a>

                    {/* Interface Section */}
                    <div className="sb-sidenav-menu-heading">Interface</div>
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon">
                            <FontAwesomeIcon icon={faColumns} />
                        </div>
                        Layouts
                        <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="layout-static.html">Static Navigation</a>
                            <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                        </nav>
                    </div>

                    {/* Pages Section */}
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                        <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faBookOpen} /></div>
                        Pages
                        <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
                    </a>
                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                Authentication
                                <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
                            </a>
                            <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link" href="login.html">Login</a>
                                    <a className="nav-link" href="register.html">Register</a>
                                    <a className="nav-link" href="password.html">Forgot Password</a>
                                </nav>
                            </div>
                            <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                Error
                                <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
                            </a>
                            <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link" href="401.html">401 Page</a>
                                    <a className="nav-link" href="404.html">404 Page</a>
                                    <a className="nav-link" href="500.html">500 Page</a>
                                </nav>
                            </div>
                        </nav>
                    </div>

                    {/* Addons Section */}
                    <div className="sb-sidenav-menu-heading">Addons</div>
                    <a className="nav-link" href="charts.html">
                        <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faChartArea} /></div>
                        Charts
                    </a>
                    <a className="nav-link" href="tables.html">
                        <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faTable} /></div>
                        Tables
                    </a>
                </div>
            </div>

            {/* Sidenav Footer */}
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {user?.sub ?? 'No Name'}
            </div>
        </nav>
    );
};

export default Sidebar;