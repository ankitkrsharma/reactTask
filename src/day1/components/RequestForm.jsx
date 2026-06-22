import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api/api";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  roomNo: Yup.string().required("Room number is required"),
  priority: Yup.string().required("Priority is required"),
});

function RequestForm({ categories, currentUser, onSuccess }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSuccessMessage("");
    setApiError("");

    try {
      const newRequest = {
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        roomNo: values.roomNo.trim(),
        studentId: currentUser.id,
        studentName: currentUser.name,
        priority: values.priority,
        status: "Open",
        createdAt: new Date().toISOString().split("T")[0],
      };

      const response = await api.post("/requests", newRequest);
      resetForm();
      setSuccessMessage("Request created successfully.");
    } catch (error) {
      setApiError("Could not create request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">Create Request</h5>

        <Formik
          initialValues={{
            title: "",
            description: "",
            category: "",
            roomNo: currentUser?.roomNo || "",
            priority: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-danger mt-1">
                  <ErrorMessage name="title" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-danger mt-1">
                  <ErrorMessage name="description" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="text-danger mt-1">
                  <ErrorMessage name="category" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Room Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="roomNo"
                  value={values.roomNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-danger mt-1">
                  <ErrorMessage name="roomNo" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  name="priority"
                  value={values.priority}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <div className="text-danger mt-1">
                  <ErrorMessage name="priority" />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !(isValid && dirty)}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              {successMessage && (
                <div className="alert alert-success mt-3 mb-0">{successMessage}</div>
              )}
              {apiError && (
                <div className="alert alert-danger mt-3 mb-0">{apiError}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RequestForm;