// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { postCategories } from "../api/commonapi";

// export default function AddCategory() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEdit = Boolean(id);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     status: "Active",
//     createdAt: "",
//     updatedAt: "",
//     price:"",
//     associated_products:'',
//     display_order:'',
//         image: null,

//   });

//   // Simulate fetch on Edit (replace with API later)
//   useEffect(() => {
//     if (isEdit) {
//       const fetchedCategory = {
//         name: "Sea Food",
//         description: "Fresh and frozen sea food items",
//         status: "Active",
//         image: null,
//          price:"",
//     associated_products:'',
//     display_order:'',
//         createdAt: "22-12-2025 09:20",
//         updatedAt: "25-12-2025 11:30",
//       };
//       setForm(fetchedCategory);
//     }
//   }, [isEdit]);

//   const handleChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//   };

//   const handleSubmit = () => {
//     if (!form.name.trim()) {
//       alert("Category name is required");
//       return;
//     }

//     if (isEdit) {
//       console.log("Updating category:", form);
//     } else {
//       console.log("Creating category:", form);
//     }

//     navigate("/category");
//   };

//   return (
//     <div className="add-category-page">
//       {/* HEADER */}
//       <div className="page-header header-with-status">
//         <div>
//           <h2>{isEdit ? "Update Category" : "Add Category"}</h2>
//           <p className="sub-text">
//             {isEdit
//               ? "Modify existing category details"
//               : "Create a new product category"}
//           </p>
//         </div>

//         {isEdit && (
//           <span className="status-badge">{form.status}</span>
//         )}
//       </div>

//       {/* FORM CARD */}
//       <div className="form-card">
//         <div className="form-grid">
//           {/* NAME */}
//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               value={form.name}
//               onChange={(e) => handleChange("name", e.target.value)}
//               placeholder="Category Name"
//             />
//           </div>
//             <div className="form-group">
//             <label>Price</label>
//             <input name="price" value={form.price} onChange={handleChange} />
//           </div>
//      <div className="form-group">
//             <label>Associated Products</label>
//             <input name="associated_products" value={form.associated_products} onChange={handleChange} />
//           </div>
//            <div className="form-group">
//             <label>Dispaly Order</label>
//             <input name="display_order" value={form.display_order} onChange={handleChange} />
//           </div>
//        <div className="form-group">
//             <label>Item Image</label>
//             <input type="file" name="image" onChange={handleChange} />
//             <small className="helper-text">Upload product image (optional - JPG, PNG, GIF)</small>
//           </div>
//           {/* DESCRIPTION */}
//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               value={form.description}
//               onChange={(e) =>
//                 handleChange("description", e.target.value)
//               }
//               placeholder="Enter general information etc."
//             />
//           </div>

//           {/* DATES (Edit only) */}
//           {isEdit && (
//             <div className="form-group date-row">
//             <div>
//                 <label>Creation Date</label>
//                 <p className="muted-text">22-12-2025 09:20</p>
//             </div>

//             <div>
//                 <label>Update Date</label>
//                 <p className="muted-text">23-12-2025 10:15</p>
//             </div>
//             </div>


//           )}
//         </div>

//         {/* ACTIONS */}
//         <div className="form-actions">
//           <button
//             className="btn-secondary"
//             onClick={() => navigate("/category")}
//           >
//             Back to Category List
//           </button>
//           <button className="btn-primary" onClick={handleSubmit}>
//             {isEdit ? "Update" : "Save"}
//           </button>
//         </div>
//       </div>
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategoryById, postCategories, editCategories } from "../api/commonapi";


export default function AddCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    display_order: "",
    image: null,
  });

  /* ---------- EDIT MODE ---------- */
  useEffect(() => {
    if (isEdit) {
      const fetchCategory = async () => {
        const data = await getCategoryById(id);

        setForm({
          name: data.category_name || "",
          description: data.description || "",
          display_order: data.display_order || "",
          image: data.image || "", // don’t auto-fill file input
          createdAt: data.formatted_created_at,
          updatedAt: data.formatted_updated_at,
          status: data.status,
        });
      };

      fetchCategory();
    }
  }, [id, isEdit]);


  /* ---------- FIXED HANDLE CHANGE ---------- */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("category_name", form.name);
      formData.append("description", form.description || "");
      formData.append("display_order", Number(form.display_order || 0));

      if (form.image) {
        formData.append("image", form.image);
      }

      // DEBUG
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (isEdit) {
        await editCategories(id, formData);
        alert("Category updated successfully");
      } else {
        await postCategories(formData);
        alert("Category created successfully");
      }

      navigate("/category");
    } catch (error) {
      console.error("SUBMIT ERROR:", error.response?.data || error);
      alert("Failed to save category");
    }
  };

  return (
    <div className="add-category-page">
      <div className="page-header header-with-status">
        <div>
          <h2>{isEdit ? "Update Category" : "Add Category"}</h2>
          <p className="sub-text">
            {isEdit ? "Modify existing category details" : "Create a new product category"}
          </p>
        </div>
        {isEdit && <span className="status-badge">{form.status}</span>}
      </div>

      <div className="form-card">
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Display Order</label>
            <input
              type='number'
              name="display_order"
              value={form.display_order}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Item Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          {/* 
          {isEdit && (
            <div className="form-group date-row">
              <div>
                <label>Creation Date</label>
                <p className="muted-text">{form.createdAt}</p>
              </div>
              <div>
                <label>Update Date</label>
                <p className="muted-text">{form.updatedAt}</p>
              </div>
            </div>
          )} */}
        </div>

        <div className="form-actions">
          <button className="btn-secondary" onClick={() => navigate("/category")}>
            Back to Category List
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
      {/* STYLES */}
      <style>{`
      .date-row {
  grid-column: span 2; /* take full row */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

        .add-category-page {
          padding: 20px;
          font-family: Inter, sans-serif;
        }

        .page-header {
          margin-bottom: 20px;
        }

        .header-with-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
        }

        .sub-text {
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }

        .form-card {
          background: #fff;
          border-radius: 10px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 500;
          margin-bottom: 6px;
        }

        input, textarea {
          padding: 11px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 14px;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37,99,235,0.15);
        }

        textarea {
          min-height: 100px;
          resize: none;
        }

        .status-badge {
          background: #dcfce7;
          color: #166534;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .dates-row {
          display: flex;
          gap: 20px;
        }

        .date-item {
          flex: 1;
        }

        .muted-text {
          color: #6b7280;
          font-size: 14px;
        }

        .form-actions {
          margin-top: 28px;
          display: flex;
          gap: 12px;
        }

        .btn-primary {
          background: #2563eb;
          color: #fff;
          border: none;
          padding: 11px 20px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
        }

        .btn-secondary {
          background: #f1f5f9;
          color: #334155;
          border: 1px solid #cbd5e1;
          padding: 11px 20px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: #1e40af;
        }

        .btn-secondary:hover {
          background: #e2e8f0;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .dates-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
