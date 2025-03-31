import { faArrowLeftRotate, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const E404 = () => {
  return (
    <>
      <img className="mb-4 img-error" src="assets/img/error-404-monochrome.svg" />
      <p>This requested URL was not found on this server.</p>
      <Link to="/">
        <FontAwesomeIcon icon={faLeftLong} className='me-1' />
        Return to Dashboard
      </Link>
    </>
  );
};

export default E404;