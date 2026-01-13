// import { useEffect, useState } from "react";
// import CommonTable from "../components/CommonTable";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { getSuppliers } from "../api/commonapi";

// export default function SupplierList() {
//   const navigate = useNavigate();
//   const [suppliers, setSuppliers] = useState([]);

//   const columns = [
//     { key: "id", label: "ID" },
//     { key: "name", label: "Supplier Name" },
//     { key: "contact", label: "Contact Information" },
//     { key: "createdAt", label: "Registration Date" },
//     { key: "updatedAt", label: "Last Update" },
//   ];

//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       const data = await getPurchaseSuppliers();
//       setSuppliers(data);
//     };
//     fetchSuppliers();
//   }, []);

//   const tableData = suppliers.map((item) => ({
//     id: item.supplier_id,
//     name: item.name,
//     contact: `${item.phone ?? "-"}${item.email ? ` / ${item.email}` : ""}`,
//     createdAt: item.created_at
//       ? new Date(item.created_at).toLocaleString()
//       : "-",
//     updatedAt: item.updated_at
//       ? new Date(item.updated_at).toLocaleString()
//       : "-",
//   }));

//   return (
//     <div className="page">
//       {/* HEADER */}
//       <div className="page-header">
//         <h2>Suppliers</h2>
//         <button
//           className="add-supplier-btn"
//           onClick={() => navigate("/suppliers/add")}
//         >
//           + Add Supplier
//         </button>
//       </div>

//       {/* TABLE */}
//       <CommonTable
//         title="Supplier List"
//         columns={columns}
//         data={tableData}
//         actions={(row) => (
//           <>
//             <button
//               className="icon-btn"
//               title="Edit"
//               onClick={() => navigate(`/suppliers/edit/${row.id}`)}
//             >
//               <FaEdit />
//             </button>
//             <button
//                 className="icon-btn delete"
//                 title="Delete"
//                 onClick={async () => {
//                   if (window.confirm("Delete this supplier?")) {
//                     const success = await deletePurchaseSupplier(row.id);
//                     if (success) {
//                       setSuppliers((prev) =>
//                         prev.filter((s) => s.supplier_id !== row.id)
//                       );
//                     }
//                   }
//                 }}
//               >
//                 <FaTrash />
//               </button>

//           </>
//         )}
//         footer={
//           <span>
//             Showing 1 to {tableData.length} of {tableData.length} entries
//           </span>
//         }
//       />

//       {/* PAGE-SPECIFIC STYLES ONLY */}
//       <style>{`
//         .add-supplier-btn {
//           background-color: #ff6b35;
//           color: #fff;
//           border: none;
//           padding: 8px 14px;
//           border-radius: 6px;
//           font-size: 14px;
//           cursor: pointer;
//           font-weight: 500;
//         }

//         .add-supplier-btn:hover {
//           background-color: #e74e16;
//         }

//         td:first-child {
//           color: #2563eb;
//           cursor: pointer;
//           font-weight: 500;
//         }

//         td:first-child:hover {
//           text-decoration: underline;
//         }
//       `}</style>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import CommonTable from "../components/CommonTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getPurchaseSuppliers,
  deletePurchaseSupplier
} from "../api/commonapi";
import Swal from "sweetalert2";



export default function SupplierList() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  // const [loading, setLoading] = useState(true);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Supplier Name" },
    { key: "contact", label: "Contact Information" },
    { key: "createdAt", label: "Registration Date" },
    { key: "updatedAt", label: "Last Update" },
  ];

  // const fetchSuppliers = async () => {
  //   try {
  //     setLoading(true);
  //     const data = await getPurchaseSuppliers();
  //     setSuppliers(data || []);
  //   } catch (error) {
  //     console.error("Error fetching suppliers:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Failed to load suppliers",
  //     });
  //     setSuppliers([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const data = await getPurchaseSuppliers();
      setSuppliers(data);
    }

    fetchSuppliers();
  }, []);

  const tableData = suppliers.map((item) => {
    // Handle contact_info - it might be a formatted string or just text
    let contact = "-";
    if (item.contact_info) {
      contact = item.contact_info;
    } else if (item.phone) {
      contact = item.phone;
      if (item.email) contact += ` / ${item.email}`;
    }

    return {
      id: item.id || item.supplier_id,
      name: item.name || "-",
      contact: contact,
      createdAt: item.date_added
        ? new Date(item.date_added).toLocaleString()
        : "-",
      updatedAt: item.date_updated
        ? new Date(item.date_updated).toLocaleString()
        : "-",
    };
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This supplier will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deletePurchaseSupplier(id);

          // 🔥 Remove row instantly from UI
      setSuppliers((prev) =>
        prev.filter((item) => item.supplier_id !== id)
      );

      // if (success) {
        // Refresh the list
        // await fetchSuppliers();

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Supplier deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Failed",
      //     text: "Unable to delete supplier",
      //   });
      // }
    } catch (error) {
      // console.error("Error deleting supplier:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to delete supplier. Please try again.",
      });
    }
  };
  

  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <h2>Suppliers</h2>
        <button
          className="add-supplier-btn"
          onClick={() => navigate("/suppliers/add")}
        >
          + Add Supplier
        </button>
      </div>

      {/* TABLE */}
      {/* {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading suppliers...</p>
        </div>
      ) : ( */}
        <CommonTable
          title="Supplier List"
          columns={columns}
          data={tableData}
          actions={(row) => (
            <>
              <button
                className="icon-btn"
                title="Edit"
                onClick={() => navigate(`/suppliers/edit/${row.id}`)}
              >
                <FaEdit />
              </button>
              <button
                className="icon-btn delete"
                title="Delete"
                onClick={() => handleDelete(row.id)}
              >
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
      

      {/* PAGE-SPECIFIC STYLES ONLY */}
      <style>{`
        .add-supplier-btn {
          background-color: #ff6b35;
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
        }

        .add-supplier-btn:hover {
          background-color: #e74e16;
        }

        td:first-child {
          color: #2563eb;
          cursor: pointer;
          font-weight: 500;
        }

        td:first-child:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

