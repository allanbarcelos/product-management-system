const Footer = () => {
  const currentyear = new Date().getFullYear();
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Copyright &copy; Task Management System {currentyear}</div>
          <div>
            <a href="/about/privacy">Privacy Policy</a>
            &middot;
            <a href="/about/terms">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;