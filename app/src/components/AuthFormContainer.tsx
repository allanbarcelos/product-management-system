import React from 'react';

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode; // Nova prop para o footer
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ title, children, footer, className = 'col-lg-5' }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={className}>
          <div className="card shadow border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-3">{title}</h3>
            </div>
            <div className="card-body">
              {children}
            </div>
            {footer && (
              <div className="card-footer text-center py-3">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFormContainer;