import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const E401 = () => {
  return (
    <>
      <h1 className="display-1">401</h1>
      <p className="lead">Unauthorized</p>
      <p>Access to this resource is denied.</p>
      <Link to="/">
        <FontAwesomeIcon icon={faLeftLong} className='me-1' />
        Return to Dashboard
      </Link>
    </>
  );
};

export default E401;