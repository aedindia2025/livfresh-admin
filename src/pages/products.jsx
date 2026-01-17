// import CommonTable from "../components/CommonTable";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function Products() {
//   const navigate = useNavigate();

//   const columns = [
//     {
//       key: "image",
//       label: "Image",
//       render: (row) => (
//         <img
//           src={`/images/products/${row.image}.png`}
//           alt={row.name}
//           width="45"
//           style={{ borderRadius: "6px" }}
//         />
//       ),
//     },
//     { key: "code", label: "Code" },
//     {
//       key: "name",
//       label: "Item Name",
//       render: (row) => (
//         <span style={{ color: "#2563eb", fontWeight: 500 }}>
//           {row.name}
//         </span>
//       ),
//     },
    
//     { key: "category", label: "Category" },
//     { key: "cost", label: "Cost" },
    
//     {
//       key: "stock",
//       label: "Stock",
//       render: (row) => <b>{row.stock}</b>,
//     },
//     {
//       key: "status",
//       label: "Status",
//       render: (row) => (
//         <span className={`badge ${row.status.replace(" ", "-").toLowerCase()}`}>
//           {row.status}
//         </span>
//       ),
//     },
//     { key: "price", label: "Price" },
//     { key: "updatedAt", label: "Last Update" },
//   ];

//   const productData = [
//     {
//       id: 1,
//       image: "pomfret-white",
//       code: "PROD1",
//       name: "Pomfret (White)",
      
//       category: "Sea Food",
//       cost: "₹264",
//       stock: 0,
//       status: "Out of Stock",
//       price: "₹264",
//       updatedAt: "25-12-2025 11:10",
//     },
//     {
//       id: 2,
//       image: "seer-fish",
//       name: "Seer Fish",
//       code: "PROD3",
//       category: "Sea Food",
//       price: "₹228",
//       stock: 1,
//       status: "Low Stock",
//       updatedAt: "25-12-2025 11:10",
//     },
//     {
//       id: 3,
//       image: "seer-fish",
//       name: "Seer Fish",
//       code: "PROD3",
//       category: "Sea Food",
//       price: "₹228",
//       stock: 1,
//       status: "Low Stock",
//       updatedAt: "25-12-2025 11:10",
//     },
//     {
//       id: 4,
//       image: "seer-fish",
//       name: "Seer Fish",
//       code: "PROD3",
//       category: "Sea Food",
//       price: "₹228",
//       stock: 1,
//       status: "Low Stock",
//       updatedAt: "25-12-2025 11:10",
//     },
//   ];

//   return (
//     <div className="products-page">
//       <div className="products-header">
//         <h2>Items</h2>
//         <button className="add-product-btn" onClick={() => navigate("/products/add")}>
//           + Add Item
//         </button>
//       </div>

//       <CommonTable
//         title="Item List"
//         columns={columns}
//         data={productData}
//         actions={(row) => (
//           <>
//             <button 
//                 className="view"
//                 title="Edit"
//                 onClick={() => navigate(`/products/edit/${row.id}`)}>
//               <FaEdit />
//             </button>
//             <button className="delete" title="Delete">
//               <FaTrash />
//             </button>
//           </>
//         )}
//       />

//       <style>{`
//       .products-page {
//           padding: 20px;
//           font-family: Inter, sans-serif;
//         }

//         .products-header {
//           margin-bottom: 15px;
//         }

//         .products-header h2 {
//           margin: 0;
//         }
//           .products-header {
//             margin-bottom: 15px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//           }

//           .products-header h2 {
//             margin: 0;
//           }
//       .add-product-btn {
//             background-color: #ff6b35;
//             color: #fff;
//             border: none;
//             padding: 8px 14px;
//             border-radius: 6px;
//             font-size: 14px;
//             cursor: pointer;
//             font-weight: 500;
//           }

//           .add-product-btn:hover {
//             background-color: #e74e16ff;
//           }
//         .badge {
//           padding: 4px 8px;
//           border-radius: 12px;
//           font-size: 12px;
//           font-weight: 500;
//         }
//         .in-stock { background: #dcfce7; color: #166534; }
//         .low-stock { background: #fee2e2; color: #991b1b; }
//         .out-of-stock { background: #e5e7eb; color: #374151; }
//       `}</style>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import CommonTable from "../components/CommonTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getItems,deleteItems } from "../api/commonapi";
import Swal from "sweetalert2";

export default function Products() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  // TABLE COLUMNS
  const columns = [
    // {
    //   key: "image",
    //   label: "Image",
    //   render: (row) => (
    //     <img
    //       src={`/images/products/${row.image}.png`}
    //       alt={row.name}
    //       width="45"
    //       style={{ borderRadius: "6px" }}
    //     />
    //   ),
    // },
    
     { key: "category", label: "Category" },
    {
      key: "name",  label: "Item Name"
      // render: (row) => (
      //   <span style={{ color: "#2563eb", fontWeight: 500 }}>
      //     {row.item_name}
      //   </span>
      // ),
    },
   { key: "code", label: "Code" },
    { key: "cost", label: "Cost" },
    {
      key: "stock",
      label: "Stock",
      render: (row) => <b>{row.stock}</b>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span className={`badge ${row.status.replace(" ", "-").toLowerCase()}`}>
          {row.status}
        </span>
      ),
    },
    { key: "price", label: "Price" },
    // { key: "updatedAt", label: "Last Update" },
  ];

  // FETCH ITEMS
  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
    };

    fetchItems();
  }, []);

  // FORMAT API DATA FOR TABLE
  const tableData = items.map((item) => ({
  id: item.item_id,   // ✅ FIXED
  image: item.image || "default",
  code: item.item_code,
  name: item.item_name,
  category: item.category_name,
  cost: `₹${Number(item.cost || 0).toFixed(2)}`,
  stock: item.current_stock,
  status:
    item.current_stock === 0
      ? "Out of Stock"
      : item.current_stock <= 5
      ? "Low Stock"
      : "In Stock",
  price: `₹${Number(item.price || 0).toFixed(2)}`,
}));


  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This item will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteItems(id);

    // 🔥 Remove row immediately from UI
    setItems((prev) => prev.filter((item) => item.item_id !== id));

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Item deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete item. Please try again.",
    });
  }
};


  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <h2>Items</h2>
        <button
          className="add-product-btn"
          onClick={() => navigate("/products/add")}
        >
          + Add Item
        </button>
      </div>

      {/* TABLE */}
      <CommonTable
        title="Item List"
        columns={columns}
        data={tableData}
        actions={(row) => (
          <>
            <button
              className="view"
              title="Edit"
              onClick={() => navigate(`/products/edit/${row.id}`)}
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

      {/* PAGE-SPECIFIC STYLES */}
      <style>{`
        .add-product-btn {
          background-color: #ff6b35;
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
        }

        .add-product-btn:hover {
          background-color: #e74e16;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .in-stock { background: #dcfce7; color: #166534; }
        .low-stock { background: #fee2e2; color: #991b1b; }
        .out-of-stock { background: #e5e7eb; color: #374151; }
      `}</style>
    </div>
  );
}

