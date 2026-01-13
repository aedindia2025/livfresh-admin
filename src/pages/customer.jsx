import { useEffect, useState } from "react";
import CommonTable from "../components/CommonTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCustomers, deleteCustomer  } from "../api/commonapi";
import Swal from "sweetalert2";

export default function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Customer Name" },
    { key: "phone", label: "Phone Number" },
    { key: "address", label: "Address" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Last Update" },
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This customer will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      await deleteCustomer(id);
  
      // 🔥 Remove row instantly from UI
      setCustomers((prev) =>
        prev.filter((item) => item.customer_id !== id)
      );
  
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Customer deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to delete customer. Please try again.",
      });
    }
  };
  

  const tableData = customers.map((item) => ({
    id: item.customer_id,
    name: item.name,
    phone: item.phone ?? "-",
    address: item.address ?? "-",
    createdAt: item.created_at
      ? new Date(item.created_at).toLocaleString()
      : "-",
    updatedAt: item.updated_at
      ? new Date(item.updated_at).toLocaleString()
      : "-",
  }));

  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <h2>Customers</h2>
        <button
          className="add-customer-btn"
          onClick={() => navigate("/customer/add")}
        >
          + Add Customer
        </button>
      </div>

      {/* TABLE */}
      <CommonTable
        title="Customer List"
        columns={columns}
        data={tableData}
        actions={(row) => (
          <>
            <button
              className="icon-btn"
              title="Edit"
              onClick={() => navigate(`/customer/edit/${row.id}`)}
            >
              <FaEdit />
            </button>
            <button
              className="delete"
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

      {/* PAGE-SPECIFIC STYLES */}
      <style>{`
        .add-customer-btn {
          background-color: #22c55e;
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
        }

        .add-customer-btn:hover {
          background-color: #16a34a;
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
