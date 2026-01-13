// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function AddEditSupplier() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = Boolean(id);

//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     businessType: "",
//     status: "Active",
//     createdAt: "",
//     updatedAt: "",
//   });

//   // 🔹 Load supplier data for editing
//   useEffect(() => {
//     if (isEdit) {
//       setForm({
//         name: "Fresh Foods Ltd",
//         address: "Chennai",
//         phone: "9876543210",
//         businessType: "Retail",
//         status: "Inactive",
//         createdAt: "2025-01-01 10:00",
//         updatedAt: "2025-01-05 12:00",
//       });
//     }
//   }, [isEdit]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const toggleStatus = () => {
//     setForm({ ...form, status: form.status === "Active" ? "Inactive" : "Active" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(isEdit ? "Updating Supplier:" : "Creating Supplier:", form);
//     navigate("/suppliers");
//   };

//   return (
//     <div className="supplier-page">
//       <div className="form-header">
//         <h2>{isEdit ? "Edit Supplier" : "Add Supplier"}</h2>
//       </div>

//       <form className="supplier-form" onSubmit={handleSubmit}>
//         {/* Name */}
//         <div>
//           <label>Name (Person/Company)</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             placeholder="Enter name / company"
//           />
//         </div>

//         {/* Address */}
//         <div>
//           <label>Address</label>
//           <textarea
//             name="address"
//             value={form.address}
//             onChange={handleChange}
//             rows={3}
//             placeholder="Enter address"
//           />
//         </div>

//         {/* Phone */}
//         <div>
//           <label>Phone</label>
//           <input
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="Enter phone number"
//           />
//         </div>

//         {/* Business Type */}
//         <div>
//           <label>Business Type</label>
//           <input
//             name="businessType"
//             value={form.businessType}
//             onChange={handleChange}
//             placeholder="Enter business type"
//           />
//         </div>

//         {/* Status */}
//         <div>
//           <label>Status</label>
//           <div
//             className={`status-pill ${form.status === "Active" ? "active" : "inactive"}`}
//             onClick={toggleStatus}
//           >
//             {form.status}
//           </div>
//         </div>

//         {/* Creation & Update Dates */}
//         <div className="full dates">
//           <div>
//             <label>Creation Date</label>
//             <div className="date-text">{form.createdAt || "Not available on creation"}</div>
//           </div>
//           <div>
//             <label>Update Date</label>
//             <div className="date-text">{form.updatedAt || "Not available on creation"}</div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="form-actions full">
//           <button type="button" className="btn-secondary" onClick={() => navigate("/suppliers")}>
//             Back
//           </button>
//           <button type="submit" className="btn-primary">
//             {isEdit ? "Update Supplier" : "Save Supplier"}
//           </button>
//         </div>
//       </form>

//       {/* STYLES */}
//       <style>{`
//         .supplier-page {
//           padding: 20px;
//           font-family: Inter, sans-serif;
//         }
//         .form-header {
//           margin-bottom: 15px;
//         }
//         .supplier-form {
//           background: #fff;
//           border-radius: 8px;
//           padding: 20px;
//           box-shadow: 0 1px 4px rgba(0,0,0,0.08);
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 14px;
//         }
//         .supplier-form .full {
//           grid-column: span 2;
//         }
//         label {
//           font-size: 13px;
//           font-weight: 500;
//           margin-bottom: 4px;
//           display: block;
//         }
//         input, textarea {
//           width: 100%;
//           padding: 8px 10px;
//           border-radius: 6px;
//           border: 1px solid #d1d5db;
//           font-size: 14px;
//         }
//         textarea {
//           resize: none;
//         }
//         .status-pill {
//           display: inline-block;
//           padding: 6px 12px;
//           border-radius: 12px;
//           font-weight: 500;
//           color: #fff;
//           cursor: pointer;
//           user-select: none;
//         }
//         .status-pill.active {
//           background-color: #22c55e;
//         }
//         .status-pill.inactive {
//           background-color: #9ca3af;
//         }
//         .dates {
//           display: flex;
//           justify-content: space-between;
//           grid-column: span 2;
//         }
//         .date-text {
//           color: #6b7280;
//           font-size: 13px;
//           margin-top: 2px;
//         }
//         .form-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 10px;
//           grid-column: span 2;
//         }
//         .btn-primary {
//           background: #22c55e;
//           color: #fff;
//           border: none;
//           padding: 8px 16px;
//           border-radius: 6px;
//           font-weight: 500;
//           cursor: pointer;
//         }
//         .btn-primary:hover {
//           background: #16a34a;
//         }
//         .btn-secondary {
//           background: #e5e7eb;
//           border: none;
//           padding: 8px 16px;
//           border-radius: 6px;
//           cursor: pointer;
//         }
//       `}</style>
//     </div>
//   );
// }

// console.log("ADD EDIT SUPPLIER LOADED");

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPurchaseSupplierById,
  createPurchaseSupplier,
  updatePurchaseSupplier,
} from "../api/commonapi";
import Swal from "sweetalert2";

export default function AddEditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    businessType: "",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Load supplier data for editing
  useEffect(() => {
    const loadSupplier = async () => {
      if (isEdit && id) {
        try {
          setLoading(true);
          const supplier = await getPurchaseSupplierById(id);
          
          if (supplier) {
            // Parse contact_info to extract phone, address, businessType
            const contactInfo = supplier.contact_info || "";
            let phone = "";
            let address = "";
            let businessType = "";

            if (contactInfo) {
              // Try to parse formatted contact_info (format: "Phone: xxx, Address: xxx, Business Type: xxx")
              if (contactInfo.includes("Phone:")) {
                const phoneMatch = contactInfo.match(/Phone:\s*([^,]+)/);
                phone = phoneMatch ? phoneMatch[1].trim() : "";
              }

              if (contactInfo.includes("Address:")) {
                const addressMatch = contactInfo.match(/Address:\s*([^,]+)/);
                address = addressMatch ? addressMatch[1].trim() : "";
              }

              if (contactInfo.includes("Business Type:")) {
                const businessMatch = contactInfo.match(/Business Type:\s*([^,]+)/);
                businessType = businessMatch ? businessMatch[1].trim() : "";
              }

              // If no formatted fields found, try to detect if it's just a phone number
              // (contains only digits, spaces, +, -, parentheses)
              if (!phone && !address && !businessType) {
                const phonePattern = /^[\d\s+\-()]+$/;
                if (phonePattern.test(contactInfo.trim())) {
                  phone = contactInfo.trim();
                } else {
                  // Otherwise, treat as address
                  address = contactInfo;
                }
              }
            }

            setForm({
              name: supplier.name || "",
              address: address,
              phone: phone,
              businessType: businessType,
              status: supplier.status ? "Active" : "Inactive",
              createdAt: supplier.date_added
                ? new Date(supplier.date_added).toLocaleString()
                : "",
              updatedAt: supplier.date_updated
                ? new Date(supplier.date_updated).toLocaleString()
                : "",
            });
          }
        } catch (error) {
          console.error("Error loading supplier:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load supplier data",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadSupplier();
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleStatus = () => {
    setForm({ ...form, status: form.status === "Active" ? "Inactive" : "Active" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Name is required",
      });
      return;
    }

    try {
      setLoading(true);

      // Build contact_info from form fields
      const contactParts = [];
      if (form.phone) contactParts.push(`Phone: ${form.phone}`);
      if (form.address) contactParts.push(`Address: ${form.address}`);
      if (form.businessType) contactParts.push(`Business Type: ${form.businessType}`);
      const contact_info = contactParts.length > 0 ? contactParts.join(", ") : "";

      // Prepare payload
      const payload = {
        name: form.name.trim(),
        contact_info: contact_info,
        status: form.status === "Active",
      };

      if (isEdit) {
        // Update supplier
        await updatePurchaseSupplier(id, payload);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Supplier updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // Create supplier
        await createPurchaseSupplier(payload);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Supplier created successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      navigate("/suppliers");
    } catch (error) {
      console.error("Error saving supplier:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        error.message ||
        "Failed to save supplier";
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="supplier-page">
      <div className="form-header">
        <h2>{isEdit ? "Edit Supplier" : "Add Supplier"}</h2>
      </div>

      {loading && isEdit && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>Loading supplier data...</p>
        </div>
      )}

      <form className="supplier-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label>Name (Person/Company)</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter name / company"
            disabled={loading}
          />
        </div>

        {/* Address */}
        <div>
          <label>Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            placeholder="Enter address"
            disabled={loading}
          />
        </div>

        {/* Phone */}
        <div>
          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            disabled={loading}
          />
        </div>

        {/* Business Type */}
        <div>
          <label>Business Type</label>
          <input
            name="businessType"
            value={form.businessType}
            onChange={handleChange}
            placeholder="Enter business type"
            disabled={loading}
          />
        </div>

        {/* Status */}
        <div>
          <label>Status</label>
          <div
            className={`status-pill ${form.status === "Active" ? "active" : "inactive"} ${loading ? "disabled" : ""}`}
            onClick={loading ? undefined : toggleStatus}
            style={loading ? { opacity: 0.6, cursor: "not-allowed" } : {}}
          >
            {form.status}
          </div>
        </div>

        {/* Creation & Update Dates */}
        <div className="full dates">
          <div>
            <label>Creation Date</label>
            <div className="date-text">{form.createdAt || "Not available on creation"}</div>
          </div>
          <div>
            <label>Update Date</label>
            <div className="date-text">{form.updatedAt || "Not available on creation"}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions full">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/suppliers")}
            disabled={loading}
          >
            Back
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading
              ? "Processing..."
              : isEdit
              ? "Update Supplier"
              : "Save Supplier"}
          </button>
        </div>
      </form>

      {/* STYLES */}
      <style>{`
        .supplier-page {
          padding: 20px;
          font-family: Inter, sans-serif;
        }
        .form-header {
          margin-bottom: 15px;
        }
        .supplier-form {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .supplier-form .full {
          grid-column: span 2;
        }
        label {
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 4px;
          display: block;
        }
        input, textarea {
          width: 100%;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }
        textarea {
          resize: none;
        }
        .status-pill {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 12px;
          font-weight: 500;
          color: #fff;
          cursor: pointer;
          user-select: none;
        }
        .status-pill.active {
          background-color: #22c55e;
        }
        .status-pill.inactive {
          background-color: #9ca3af;
        }
        .dates {
          display: flex;
          justify-content: space-between;
          grid-column: span 2;
        }
        .date-text {
          color: #6b7280;
          font-size: 13px;
          margin-top: 2px;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          grid-column: span 2;
        }
        .btn-primary {
          background: #22c55e;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
        }
        .btn-primary:hover:not(:disabled) {
          background: #16a34a;
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .btn-secondary {
          background: #e5e7eb;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
        .btn-secondary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        input:disabled, textarea:disabled {
          background-color: #f3f4f6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
