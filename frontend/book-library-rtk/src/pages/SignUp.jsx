import { Link, useNavigate } from "react-router";
import { userSignup } from "../App/featuresSlicecs/authSlices";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector((state) => state.users);

  const [isHide, setHide] = useState(false);
  const [isUserEnterPasswordFields, setIsUserEnterPasswordFields] =
    useState(false);
  const [isInvalidEmailAdd, setInvalidEmailAdd] = useState(false);

  const userName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const userSetpassword = useRef();

  useEffect(() => {
    if (message) {
      alert(message);

      userName.current.value = "";
      userEmail.current.value = "";
      userPassword.current.value = "";
      userSetpassword.current.value = "";

      navigate("/");
    }
  }, [message]);

  const handlePostUsers = async () => {
    let email = userEmail.current.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\\s@]+$/;

    if (!emailRegex.test(email)) {
      setInvalidEmailAdd(true);
      return;
    }

    setInvalidEmailAdd(false);

    const password = userPassword.current.value;
    const confirmPassword = userSetpassword.current.value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    if (password !== confirmPassword) {
      alert("Password not matched");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Weak Password");
      return;
    }

    if (
      !userName.current.value ||
      !userEmail.current.value ||
      !userPassword.current.value ||
      !userSetpassword.current.value
    ) {
      alert("Please fill all fields");
      return;
    }

    await dispatch(
      userSignup({
        name: userName.current.value,
        email: userEmail.current.value,
        password: userPassword.current.value,
      })
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="border p-5 w-50 text-white mt-5">

        <h3 className="mb-3">Sign Up Page</h3>

        {error && (
          <div className="alert alert-danger">
            {error.message || error}
          </div>
        )}

        <div className="form-floating mb-3">
          <input
            ref={userName}
            type="text"
            className="form-control bg-dark text-white"
            id="name"
            placeholder="Name"
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            ref={userEmail}
            type="email"
            className={`form-control bg-dark text-white ${
              isInvalidEmailAdd ? "is-invalid" : ""
            }`}
            id="email"
            placeholder="Email"
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            ref={userSetpassword}
            type={isHide ? "text" : "password"}
            className="form-control bg-dark text-white"
            id="setPassword"
            placeholder="Set Password"
          />
          <label htmlFor="setPassword">Set Password</label>
        </div>

        <div className="form-floating position-relative">
          <input
            ref={userPassword}
            type={isHide ? "text" : "password"}
            className="form-control bg-dark text-white"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) =>
              setIsUserEnterPasswordFields(e.target.value.length > 0)
            }
          />
          <label htmlFor="confirmPassword">Confirm Password</label>

          {isUserEnterPasswordFields && (
            <i
              className={isHide ? "bi bi-eye-slash" : "bi bi-eye"}
              onClick={() => setHide(!isHide)}
              style={{
                position: "absolute",
                right: "15px",
                top: "20px",
                cursor: "pointer",
                color: "white",
              }}
            ></i>
          )}
        </div>

        <button
          onClick={handlePostUsers}
          disabled={loading}
          className="btn btn-success mt-3 w-100"
        >
          {loading ? "Please Wait..." : "SIGN UP"}
        </button>

        <div className="mt-3">
          <p>
            Already have an account?
            <Link
              to="/"
              className="ms-2 text-info text-decoration-none"
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}