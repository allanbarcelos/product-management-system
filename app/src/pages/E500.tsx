import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const E500 = () => {
  return (
    <>
      <h1 className="display-1">500</h1>
      <p className="lead">Internal Server Error</p>
      <Link to="/">
        <FontAwesomeIcon icon={faLeftLong} className='me-1' />
        Return to Dashboard
      </Link>
    </>
  );
};

export default E500;