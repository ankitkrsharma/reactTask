import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin-dashboard" : "/student-dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoginError("");

    try {
      const response = await api.get("/users", {
        params: {
          email: values.email,
          password: values.password,
        },
      });

      if (response.data.length === 0) {
        setLoginError("Invalid email or password");
      } else {
        const loggedUser = response.data[0];
        login(loggedUser);
        navigate(loggedUser.role === "admin" ? "/admin-dashboard" : "/student-dashboard");
      }
    } catch (error) {
      setLoginError("Login failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-4 text-center">Login</h3>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger mt-1">
                    <ErrorMessage name="email" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="text-danger mt-1">
                    <ErrorMessage name="password" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting || !(isValid && dirty)}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>

                {loginError && <div className="alert alert-danger mt-3 mb-0">{loginError}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;