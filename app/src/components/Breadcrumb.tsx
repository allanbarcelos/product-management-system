import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb as ReactBreadcrumb } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'; // Importando um ícone específico

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <>            
            <ReactBreadcrumb>
                <ReactBreadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                <FontAwesomeIcon icon={faHome} /> /
                </ReactBreadcrumb.Item>
                {pathnames.map((path, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                        <ReactBreadcrumb.Item
                            key={path}
                            active={isLast}
                            linkAs={isLast ? undefined : Link}
                            linkProps={isLast ? undefined : { to: routeTo }} >
                            {path.charAt(0).toUpperCase() + path.slice(1)}
                        </ReactBreadcrumb.Item>
                    );
                })}
            </ReactBreadcrumb>
        </>
    );
};

export default Breadcrumb;