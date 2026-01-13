// import CommonTable from "../components/CommonTable";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { getCategories} from "../api/commonapi";


// export default function Category() {
//   const navigate = useNavigate(); //for add category

//   const columns = [
//     { key: "name", label: "Category Name" },
//     { key: "description", label: "Description" },
//     { key: "products", label: "Associated Products" },
//     { key: "createdAt", label: "Creation Date" },
//     { key: "updatedAt", label: "Last Update Date" },
//   ];

//   const categoryData = [
//     {
//       name: "Sea Food",
//       description:
//         "Fresh and frozen sea food items including various fish varieties",
//       products: 48,
//       createdAt: "22-12-2025 09:20",
//       updatedAt: "22-12-2025 09:20",
//     },
//     {
//       name: "Live Fish",
//       description: "Fresh live fish available for sale",
//       products: 6,
//       createdAt: "22-12-2025 09:20",
//       updatedAt: "22-12-2025 09:20",
//     },
//     {
//       name: "Chilled Fish",
//       description: "Fresh chilled fish stored in ice",
//       products: 6,
//       createdAt: "22-12-2025 09:20",
//       updatedAt: "22-12-2025 09:20",
//     },
//     {
//       name: "Dry Fish",
//       description: "Dried and preserved fish products",
//       products: 30,
//       createdAt: "22-12-2025 09:20",
//       updatedAt: "22-12-2025 09:20",
//     },
//     {
//       name: "Ready to Cook Fish",
//       description: "Prepared and marinated fish ready for cooking",
//       products: 5,
//       createdAt: "22-12-2025 09:20",
//       updatedAt: "22-12-2025 09:20",
//     },
//     {
//       name: "Masala Fish",
//       description: "Fish products with spices and masala",
//       products: 2,
//       createdAt: "22-12-2025 09:20",
//       updatedAt: "22-12-2025 09:20",
//     },
//   ];

//   return (
//     <div className="category-page">
//      {/* PAGE HEADER */}
//       <div className="category-header">
//         <h2>Category</h2>
//         <button
//           className="add-category-btn"
//           onClick={() => navigate("/category/add")}
//         >
//           + Add Category
//         </button>

//       </div>


//       {/* COMMON TABLE */}
//       <CommonTable
//         title="Category List"
//         columns={columns}
//         data={categoryData}
//         actions={(row) => (
//           <>
//             <button
//               className="view"
//               title="Edit"
//               onClick={() => navigate(`/category/edit/${row.id}`)}
//             >
//               <FaEdit />
//             </button>

//             <button className="delete" title="Delete">
//               <FaTrash />
//             </button>
//           </>
//         )}
//         footer={
//           <span>
//             Showing 1 to {categoryData.length} of {categoryData.length} entries
//           </span>
//         }
//       />

//       {/* PAGE-ONLY STYLES */}
//       <style>{`
//         .category-page {
//           padding: 20px;
//           font-family: Inter, sans-serif;
//         }

//         .category-header {
//           margin-bottom: 15px;
//         }

//         .category-header h2 {
//           margin: 0;
//         }

//         /* Make category name look like link */
//         td:first-child {
//           color: #2563eb;
//           cursor: pointer;
//           font-weight: 500;
//         }

//         td:first-child:hover {
//           text-decoration: underline;
//         }
//           .category-header {
//             margin-bottom: 15px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//           }

//           .category-header h2 {
//             margin: 0;
//           }

//           .add-category-btn {
//             background-color: #ff6b35;
//             color: #fff;
//             border: none;
//             padding: 8px 14px;
//             border-radius: 6px;
//             font-size: 14px;
//             cursor: pointer;
//             font-weight: 500;
//           }

//           .add-category-btn:hover {
//             background-color: #e74e16ff;
//           }

//       `}</style>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import CommonTable from "../components/CommonTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCategories,deleteCategories  } from "../api/commonapi";
import Swal from "sweetalert2";

export default function Category() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  // TABLE COLUMNS
  const columns = [
    { key: "name", label: "Category Name" },
    { key: "description", label: "Description" },
    { key: "products", label: "Associated Products" },
    { key: "createdAt", label: "Creation Date" },
    { key: "updatedAt", label: "Last Update Date" },
  ];

  // FETCH CATEGORY LIST
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // FORMAT API DATA FOR TABLE
  const tableData = categories.map((item) => {
  console.log("RAW ITEM:", item);

  return {
    id: item.category_id,
    name: item.category_name,
    description: item.description ?? "-",
    products: item.associated_products ?? 0,
    image:item.image,
    createdAt: item.created_at
      ? new Date(item.created_at).toLocaleString()
      : "-",
    updatedAt: item.updated_at
      ? new Date(item.updated_at).toLocaleString()
      : "-",
  };
});

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This category will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteCategories(id);

    // 🔥 Remove row instantly from UI
    setCategories((prev) =>
      prev.filter((item) => item.category_id !== id)
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Category deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Unable to delete category. Please try again.",
    });
  }
};



  return (
    <div className="category-page">
      {/* PAGE HEADER */}
      <div className="category-header">
        <h2>Category</h2>
        <button
          className="add-category-btn"
          onClick={() => navigate("/category/add")}
        >
          + Add Category
        </button>
      </div>

      {/* COMMON TABLE */}
      <CommonTable
        title="Category List"
        columns={columns}
        data={tableData}
        actions={(row) => (
          <>
            <button
              className="view"
              title="Edit"
              onClick={() => navigate(`/category/edit/${row.id}`)}
            >
              <FaEdit />
            </button>

            <button className="delete" title="Delete"  onClick={() => handleDelete(row.id)}>
              <FaTrash />
            </button>
          </>
        )}
        footer={
          <span>
            Showing 1 to {tableData.length} of {tableData.length} entries
          </span>
        }
      />

      {/* PAGE-ONLY STYLES */}
      <style>{`
        .category-page {
          padding: 20px;
          font-family: Inter, sans-serif;
        }

        .category-header {
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .category-header h2 {
          margin: 0;
        }

        /* Make category name look like link */
        td:first-child {
          color: #2563eb;
          cursor: pointer;
          font-weight: 500;
        }

        td:first-child:hover {
          text-decoration: underline;
        }

        .add-category-btn {
          background-color: #ff6b35;
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
        }

        .add-category-btn:hover {
          background-color: #e74e16ff;
        }
      `}</style>
    </div>
  );
}
