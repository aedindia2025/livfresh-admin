import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, postCustomer, editCustomer } from "../api/commonapi";
import Swal from "sweetalert2";

export default function AddEditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone_no: "",

  });

  // 🔹 Load customer data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchCustomer = async () => {
        try {
          const data = await getCustomerById(id);
          setForm({
            name: data.name || "",
            address: data.address || "",
            phone_no: data.phone_no || "",
          
          });
        } catch (err) {
          console.error("Error fetching customer:", err);
        }
      };
      fetchCustomer();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await editCustomer(id, form);
        Swal.fire("Updated!", "Customer updated successfully", "success");
      } else {
        await postCustomer(form);
        Swal.fire("Created!", "Customer added successfully", "success");
      }
      navigate("/customer");
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  

  return (
    <div className="customer-page">
      <div className="form-header">
        <h2>{isEdit ? "Edit Customer" : "Add Customer"}</h2>
      </div>

      <form className="customer-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter customer name"
          />
        </div>
        
        {/* Phone */}
        <div>
          <label>Phone</label>
          <input
            name="phone_no"
            value={form.phone_no}
            onChange={handleChange}
            placeholder="Enter phone number"
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
          />
        </div>

        {/* Action Buttons */}
        <div className="form-actions full">
          <button type="button" className="btn-secondary" onClick={() => navigate("/customer")}>
            Back
          </button>
          <button type="submit" className="btn-primary">
            {isEdit ? "Update Customer" : "Save Customer"}
          </button>
        </div>
      </form>

      {/* STYLES */}
      <style>{`
        .customer-page { padding: 20px; font-family: Inter, sans-serif; }
        .form-header { margin-bottom: 15px; }
        .customer-form {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .customer-form .full { grid-column: span 2; }
        label { font-size: 13px; font-weight: 500; margin-bottom: 4px; display: block; }
        input, textarea {
          width: 100%;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }
        textarea { resize: none; }
        .status-pill {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 12px;
          font-weight: 500;
          color: #fff;
          cursor: pointer;
          user-select: none;
        }
        .status-pill.active { background-color: #22c55e; }
        .status-pill.inactive { background-color: #9ca3af; }
        .dates { display: flex; justify-content: space-between; grid-column: span 2; }
        .date-text { color: #6b7280; font-size: 13px; margin-top: 2px; }
        .form-actions { display: flex; justify-content: flex-end; gap: 10px; grid-column: span 2; }
        .btn-primary {
          background: #22c55e;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
        }
        .btn-primary:hover { background: #16a34a; }
        .btn-secondary {
          background: #e5e7eb;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
