// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   getCategories,
//   getItemsById,
//   postItems,
//   editItems
// } from "../api/commonapi.js";

// export default function AddEditProduct() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEdit = Boolean(id);

//   const [category, setCategory] = useState([]);

//   const [form, setForm] = useState({
//     code: "",
//     name: "",
//     category: "",
//     description: "",
//     cost: "",
//     price: "",
//     mrp: "",
//     gst: "",
//     minStock: "",
//     maxStock: "",
//     status: "Active",
//     image: null,
//   });

//   /* ================= Load Categories ================= */
//   useEffect(() => {
//     const loadDropdowns = async () => {
//       const categoryRes = await getCategories();
//       setCategory(categoryRes || []);
//     };
//     loadDropdowns();
//   }, []);

//   /* ================= Edit Mode ================= */
//   useEffect(() => {
//   if (!isEdit) return;

//   const fetchItem = async () => {
//     try {
//       const data = await getItemsById(id);

//       setForm({
//         code: data.item_code || "",
//         name: data.item_name || "",
//         category: data.category ? String(data.category) : "",
//         description: data.description || "",
//         cost: data.cost || "",
//         price: data.price || "",
//         mrp: data.mrp || "",
//         gst: data.tax_percentage || "",
//         minStock: data.min_stock || "",
//         maxStock: data.max_stock || "",
//         status: data.status ? "Active" : "Inactive",
//         image: null,
//       });
//     } catch (err) {
//       console.error("Failed to load item", err);
//     }
//   };

//   fetchItem();
// }, [id, isEdit]);


//   /* ================= Change Handler ================= */
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   /* ================= Submit ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       category: form.category,
//       item_name: form.name,
//       item_code: form.code,
//       cost: form.cost,
//       price: form.price,
//       mrp: form.mrp,
//       tax_percentage: form.gst,
//       min_stock: form.minStock,
//       max_stock: form.maxStock,
//       status: form.status === "Active",
//       description: form.description,
//     };

//     try {
//       if (isEdit) {
//         await editItems(id, payload);
//       } else {
//         await postItems(payload);
//       }
//       navigate("/products");
//     } catch (error) {
//       console.error("Save failed", error);
//     }
//   };

//   /* ================= Status Toggle ================= */
//   const toggleStatus = () => {
//     setForm((prev) => ({
//       ...prev,
//       status: prev.status === "Active" ? "Inactive" : "Active",
//     }));
//   };

//   return (
//     <div className="product-form-page">
//       <div className="form-header">
//         <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
//       </div>

//       <form className="product-form" onSubmit={handleSubmit}>
//         <div className="grid">

//           {/* Category */}
//           <div>
//             <label>Category</label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Category</option>
//               {category.map((c) => (
//                 <option key={c.category_id} value={c.category_id}>
//                   {c.category_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label>Item Name</label>
//             <input name="name" value={form.name} onChange={handleChange} required />
//           </div>

//           <div>
//             <label>Code</label>
//             <input name="code" value={form.code} onChange={handleChange} required />
//           </div>

//           <div>
//             <label>Price</label>
//             <input name="price" value={form.price} onChange={handleChange} />
//           </div>

//           <div>
//             <label>MRP</label>
//             <input name="mrp" value={form.mrp} onChange={handleChange} />
//           </div>

//           <div>
//             <label>GST (%)</label>
//             <input name="gst" value={form.gst} onChange={handleChange} />
//           </div>

//           <div>
//             <label>Minimum Stock</label>
//             <input name="minStock" value={form.minStock} onChange={handleChange} />
//           </div>

//           <div>
//             <label>Maximum Stock</label>
//             <input name="maxStock" value={form.maxStock} onChange={handleChange} />
//           </div>

//           <div>
//             <label>Status</label>
//             <div
//               className={`status-pill ${form.status === "Active" ? "active" : "inactive"}`}
//               onClick={toggleStatus}
//             >
//               {form.status}
//             </div>
//           </div>

//           <div>
//             <label>Item Image</label>
//             <input type="file" name="image" onChange={handleChange} />
//           </div>

//           <div className="full">
//             <label>Description</label>
//             <textarea
//               name="description"
//               rows="3"
//               value={form.description}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="form-actions">
//           <button type="button" className="btn-secondary" onClick={() => navigate("/products")}>
//             Back
//           </button>
//           <button className="btn-primary">
//             {isEdit ? "Update Product" : "Save Product"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCategories,
  getItemsById,
  postItems,
  editItems
} from "../api/commonapi.js";

export default function AddEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [imageName, setImageName] = useState("");
  const [category, setCategory] = useState([]);

  const [form, setForm] = useState({
    code: "",
    name: "",
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

  /* ================= Load Categories ================= */
  useEffect(() => {
    const loadCategories = async () => {
      const res = await getCategories();
      setCategory(res || []);
    };
    loadCategories();
  }, []);

  /* ================= Edit Mode ================= */
  useEffect(() => {
    if (!isEdit) return;
  
    const fetchItem = async () => {
      const data = await getItemsById(id);
  
      setForm({
        code: data.item_code || "",
        name: data.item_name || "",
        category: data.category ? String(data.category) : "",
        description: data.description || "",
        cost: data.cost || "",
        price: data.price || "",
        mrp: data.mrp || "",
        gst: data.tax_percentage || "",
        minStock: data.min_stock || "",
        maxStock: data.max_stock || "",
        status: data.status ? "Active" : "Inactive",
        image: null,
      });
  
      // ⭐ image name only
      if (data.image) {
        const filename = data.image.split("/").pop();
        setImageName(filename);
      }
    };
  
    fetchItem();
  }, [id, isEdit]);
  

  /* ================= Change Handler ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (files && files[0]) {
      setForm((prev) => ({
        ...prev,
        image: files[0],
      }));
  
      // ⭐ new file name
      setImageName(files[0].name);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  /* ================= Submit ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use FormData to support file uploads
      const formData = new FormData();
      
      // Append all form fields
      formData.append("category", form.category);
      formData.append("item_name", form.name);
      formData.append("item_code", form.code);
      formData.append("cost", form.cost || "0");
      formData.append("price", form.price || "0");
      formData.append("mrp", form.mrp || "");
      formData.append("tax_percentage", form.gst || "");
      formData.append("min_stock", form.minStock || "");
      formData.append("max_stock", form.maxStock || "");
      formData.append("status", form.status === "Active");
      formData.append("description", form.description || "");

      // Append image if selected
      if (form.image) {
        formData.append("image", form.image);
      }

      if (isEdit) {
        await editItems(id, formData);
      } else {
        await postItems(formData);
      }

      navigate("/products");
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save product. Please try again.");
    }
  };

  /* ================= Status Toggle ================= */
  const toggleStatus = () => {
    setForm((prev) => ({
      ...prev,
      status: prev.status === "Active" ? "Inactive" : "Active",
    }));
  };

  return (
    <div className="product-page">
      <div className="form-header">
        <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="grid">

          <div>
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select</option>
              {category.map((c) => (
                <option key={c.category_id} value={c.category_id}>
                  {c.category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Item Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div>
            <label>Code</label>
            <input name="code" value={form.code} onChange={handleChange} />
          </div>

          <div>
            <label>Price</label>
            <input name="price" value={form.price} onChange={handleChange} />
          </div>

          <div>
            <label>MRP</label>
            <input name="mrp" value={form.mrp} onChange={handleChange} />
          </div>

          <div>
            <label>GST (%)</label>
            <input name="gst" value={form.gst} onChange={handleChange} />
          </div>

          <div>
            <label>Min Stock</label>
            <input name="minStock" value={form.minStock} onChange={handleChange} />
          </div>

          <div>
            <label>Max Stock</label>
            <input name="maxStock" value={form.maxStock} onChange={handleChange} />
          </div>

          <div>
            <label>Status</label>
            <div
              className={`status-pill ${form.status === "Active" ? "active" : "inactive"}`}
              onClick={toggleStatus}
            >
              {form.status}
            </div>
          </div>

          <div>
            <label>Item Image</label>
            {/* IMAGE NAME DISPLAY */}
            {imageName && (
              <div style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}>
                Current Image: <b>{imageName}</b>
              </div>
            )}
            <input type="file" name="image" onChange={handleChange} />
          </div>

          <div className="full">
            <label>Description</label>
            <textarea rows="3" name="description" value={form.description} onChange={handleChange} />
          </div>

        </div>

        <div className="form-actions full">
          <button type="button" className="btn-secondary" onClick={() => navigate("/products")}>
            Back
          </button>
          <button type="submit" className="btn-primary">
            {isEdit ? "Update Product" : "Save Product"}
          </button>
        </div>
      </form>

      {/* STYLES */}
      <style>{`
        .product-page {
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
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .product-form .full {
          grid-column: span 2;
        }
        .product-form .grid {
          display: contents;
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
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          grid-column: span 2;
        }
        .btn-primary {
          background: #ff6b35;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
        }
        .btn-primary:hover {
          background: #e74e16;
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

