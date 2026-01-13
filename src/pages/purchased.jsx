import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import CommonTable from "../components/CommonTable";
import Swal from "sweetalert2";
import { getPurchase ,deletePurchase } from "../api/commonapi";

export default function PurchasedProducts() {
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState([]);

  

  // TABLE COLUMNS
  const columns = [
     { key: "name", label: "Product" },
    { key: "supplier_name", label: "Supplier" },
    { key: "cost_display", label: "Cost" },
    { key: "qty", label: "Quantity" },
    { key: "total_display", label: "Total Amount" },
    // { key: "date_updated", label: "Last Update" },
  ];

  // MOCK DATA (replace with API)
  // useEffect(() => {
  //   setData([
  //     {
  //       id: 1,
  //       product: "Barracuda",
  //       supplier: "Marine Products Co.",
  //       cost: 134.63,
  //       quantity: 10,
  //       total: 1346.3,
  //       updatedAt: "08-01-2026 07:15",
  //     },
  //     {
  //       id: 2,
  //       product: "Dry Crab",
  //       supplier: "Marine Products Co.",
  //       cost: 76.04,
  //       quantity: 19,
  //       total: 1444.76,
  //       updatedAt: "08-01-2026 07:15",
  //     },
  //   ]);
  // }, []);

   useEffect(() => {
      const fetchPurchase = async () => {
        const data = await getPurchase();
        setPurchase(data);
      };
  
      fetchPurchase();
    }, []);
const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This purchase will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await deletePurchase(id);

    // 🔥 Update UI instantly
    setPurchase((prev) =>
      prev.filter((item) => item.purchase_id !== id)
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Purchase deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete purchase. Please try again.",
    });
  }
};


  

     const tableData = purchase.map((item) => {
      console.log("Purchase Item:", item);
    
      return {
        id: item.purchase_id,
        name: item.product_name,
        supplier: item.supplier,
        supplier_name: item.supplier_name,
        cost:item.cost,
        cost_display:item.cost_display,
        qty:item.qty,
        total:item.total,
        total_display:item.total_display,
        totalcost:item.cost,
        date_added: item.date_added
          ? new Date(item.date_added).toLocaleString()
          : "-",
        date_updated: item.date_updated
          ? new Date(item.date_updated).toLocaleString()
          : "-",
      };
    });



  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <h2>Purchased Products</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/purchased/add")}
        >
          + Add Purchase
        </button>
      </div>

      {/* TABLE */}
      <CommonTable
        title="Purchased Products List"
        columns={columns}
        data={tableData}
        actions={(row) => (
          <>
            <button
              className="view"
              title="Edit"
              onClick={() => navigate(`/purchased/edit/${row.id}`)}
            >
              <FaEdit />
            </button>
            <button className="delete" title="Delete" onClick={() => handleDelete(row.id)}>
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
    </div>
  );
}
