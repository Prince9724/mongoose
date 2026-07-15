import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../App/featuresSlicecs/authSlices";

export default function SignIn() {
  const [isHide, setHide] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, error } = useSelector(
    (state) => state.users
  );

  const userEmail = useRef(null);
  const userPassword = useRef(null);

  // ================= LOGIN =================

  const handleLogin = () => {
    if (
      !userEmail.current.value ||
      !userPassword.current.value
    ) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      userSignIn({
        email: userEmail.current.value,
        password: userPassword.current.value,
      })
    );
  };

  // ================= RESPONSE =================

  useEffect(() => {
    if (message) {
      alert(message);

      if (message === "Signin successfully !!") {
        navigate("/home");
      }
    }

    if (error) {
      alert(error);
    }
  }, [message, error, navigate]);

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="signIn-container mt-5 border p-5 w-50 rounded">

          <h3 className="mb-4">Sign In</h3>

          <div className="form-floating mb-3">
            <input
              ref={userEmail}
              type="email"
              className="form-control bg-dark text-white"
              placeholder="Email"
            />
            <label>Email</label>
          </div>

          <div className="form-floating">
            <input
              ref={userPassword}
              type={isHide ? "text" : "password"}
              className="form-control bg-dark text-white"
              placeholder="Password"
            />

            <label>Password</label>

            <i
              onClick={() => setHide(!isHide)}
              className={`${
                isHide
                  ? "bi bi-eye-slash-fill"
                  : "bi bi-eye-fill"
              }`}
              style={{
                position: "absolute",
                right: "15px",
                top: "30px",
                cursor: "pointer",
                color: "white",
              }}
            ></i>
          </div>

          <button
            onClick={handleLogin}
            className="btn btn-success mt-4 w-100"
            disabled={loading}
          >
            {loading ? "Loading..." : "SIGN IN"}
          </button>

          <div className="mt-3">
            <p>
              No Account?

              <Link
                to="/signup"
                className="ms-2"
              >
                Sign Up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}