import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const UnverifiedRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);

  const status = authState.status;
  const emailVerification = authState?.userData?.emailVerification || false;

  return (
    <>
      {status ? (
        !emailVerification ? (
          children
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default UnverifiedRoute;
