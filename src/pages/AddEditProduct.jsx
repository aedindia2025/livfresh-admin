import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCategories,
  getItemsById,
  postItems,
  editItems,
} from "../api/commonapi.js";

export default function AddEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [category, setCategory] = useState([]);


  const [form, setForm] = useState({
    item_code: "",
    item_name: "",
    category: "",
    description: "",
    cost: "",
    price: "",
    mrp: "",
    gst: "",
    minStock: "",
    maxStock: "",
    status: "Active",
    image: null,
  });

useEffect(() => {
    const loadDropdowns = async () => {
      const categoryRes = await getCategories();
      setCategory(categoryRes);
    };

    loadDropdowns();
  }, []);


  // 🔹 Simulate Edit Mode Data Fetch
  // useEffect(() => {
  //   if (isEdit) {
  //     setForm({
  //       code: "PROD1",
  //       name: "Pomfret (White)",
  //       category: "Sea Food",
  //       description:
  //         "Fresh pomfret (white) - Fresh and frozen sea food items including various fish varieties",
  //       cost: "264",
  //       price: "264",
  //       mrp: "264",
  //       gst: "0",
  //       minStock: "3",
  //       maxStock: "10",
  //       status: "Inactive",
  //       image: null,
  //     });
  //   }
  // }, [isEdit]);


  useEffect(() => {
  if (isEdit) {
    getItemsById(id).then((data) => {
      setForm({
        category: String(data.category),
        item_name: data.item_name || "",
        item_code: data.item_code || "",
        price: data.price || "",
        mrp: data.mrp || "",
        gst: data.gst || "",
        minStock: data.min_stock || "",
        maxStock: data.max_stock || "",
        status: data.status || "Active",
        description: data.description || "",
        image: null,
      });
    });
  }
}, [id, isEdit]);



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const payload = {
  category: Number(form.category),
  item_name: form.item_name,
  item_code: form.item_code,
  price: Number(form.price),
  mrp: form.mrp ? Number(form.mrp) : null,
  gst: form.gst ? Number(form.gst) : 0,
  min_stock: form.minStock || 3,
  max_stock: form.maxStock || 10,
  status: form.status === "Active",
    description: form.description,
};


     if (isEdit) {
      await editItems(id, payload);
    } else {
      await postItems(payload);
    }

    console.log("Submitted Data:", form);
    navigate("/products");
  };

  const toggleStatus = () => {
    setForm({
      ...form,
      status: form.status === "Active" ? "Inactive" : "Active",
    });
  };

  return (
    <div className="product-form-page">
      <div className="form-header">
        <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="grid">
         

          {/* Category */}
          <div>
            <label>Category</label>
             <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {category.map((item) => (
              <option key={item.category_id} value={item.category_id}>
                {item.category_name}
              </option>
            ))}
          </select>
            {/* <input name="category" value={form.category} onChange={handleChange} /> */}
          </div>

          {/* Product Name */}
          <div>
            <label>Product Name</label>
            <input
  name="item_name"
  value={form.item_name}
  onChange={handleChange}
  required
/>

          </div>
           {/* Product Code */}
          <div>
            <label>Code</label>
<input
  name="item_code"
  value={form.item_code}
  onChange={handleChange}
  required
/>          </div>

          {/* Price */}
          <div>
            <label>Price</label>
<input
  name="price"
  value={form.price}
  onChange={handleChange}
  required
/>          </div>

          {/* MRP with helper */}
          <div>
            <label>MRP (Maximum Retail Price)</label>
            <input name="mrp" value={form.mrp} onChange={handleChange} />
            <small className="helper-text">Maximum Retail Price (MRP)</small>
          </div>

          {/* GST */}
          <div>
            <label>GST/Tax Rate (%)</label>
            <input name="gst" value={form.gst} onChange={handleChange} />
            <small className="helper-text">Enter GST/Tax rate in percentage (e.g., 5 for 5%, 0 for 0%)</small>
          </div>

          {/* Min Stock with helper */}
          <div>
            <label>Minimum Stock</label>
            <input name="minStock" value={form.minStock} onChange={handleChange} />
            <small className="helper-text">Alert when stock goes below this level (default: 3 kg)</small>
          </div>

          {/* Max Stock */}
          <div>
            <label>Maximum Stock</label>
            <input name="maxStock" value={form.maxStock} onChange={handleChange} />
            <small className="helper-text">Recommended maximum stock level (default: 10 kg)</small>
          </div>

          {/* Status as pill badge */}
          <div>
            <label>Status</label>
            <div
              className={`status-pill ${form.status === "Active" ? "active" : "inactive"}`}
              onClick={toggleStatus}
            >
              {form.status}
            </div>
          </div>

          {/* Product Image */}
          <div>
            <label>Item Image</label>
            <input type="file" name="image" onChange={handleChange} />
            <small className="helper-text">Upload product image (optional - JPG, PNG, GIF)</small>
          </div>

          {/* Description full width */}
          <div className="full">
            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Creation & Update Dates */}
          {/* <div className="full dates">
            <div>
              <label>Creation Date</label>
              <div className="date-text">
                {isEdit ? "22-12-2025 09:20" : "Not available on creation"}
              </div>
            </div>
            <div>
              <label>Update Date</label>
              <div className="date-text">
                {isEdit ? "22-12-2025 09:20" : "Not available on creation"}
              </div>
            </div>
          </div> */}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate("/products")}>
            Back
          </button>
          <button className="btn-primary">{isEdit ? "Update Product" : "Save Product"}</button>
        </div>
      </form>

      <style>{`
        .product-form-page {
          padding: 20px;
          font-family: Inter, sans-serif;
        }

        .form-header {
          margin-bottom: 15px;
        }

        .product-form {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .grid .full {
          grid-column: span 2;
        }

        label {
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 4px;
          display: block;
        }

        input, textarea, select {
          width: 100%;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }

        textarea {
          resize: none;
        }

        .helper-text {
          display: block;
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
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
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
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

        .btn-primary:hover {
          background: #16a34a;
        }

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
