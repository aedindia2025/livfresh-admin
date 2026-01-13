import { useState, useEffect } from "react";
import CommonTable from "../components/CommonTable"; // adjust if your component is elsewhere
import { getOrderReport } from "../api/commonapi"; // make sure commonapi.js is in src/

export default function OrderReport() {
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await getOrderReport(); // safely returns an array
  //       setOrders(data);
  //     } catch (error) {
  //       console.error("Failed to fetch orders:", error);
  //       setOrders([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrderReport();
      setOrders(data);
    };

    fetchOrders();
  }, []);


  const columns = [
    { label: "Order No", key: "order_number" },
    { label: "Order Source", key: "order_source" },
    { label: "Customer", key: "name" },
    { label: "Phone No", key: "phone_no" },
    { label: "Count", key: "items_count" },
    { label: "Products", key: "products_display" },
    { label: "Total Weight", key: "total_weight" },
    { label: "Total Amount", key: "total_amount" },
    { label: "Date", key: "invoice_date" },
    { label: "Status", key: "payment_status" },
    
  ];



  const tableData = orders.map((item) => {
  console.log("RAW ITEM:", item);

  return {
    id: item.order_id,
    name: item.name,
    order_number: item.order_number,
    phone_no: item.phone_no,
    address: item.address,
    order_source: item.order_source,
    payment_status: item.payment_status,
    device_id: item.device_id,
    subtotal: item.subtotal,
    total_discount: item.total_discount,
    total_tax: item.total_tax,
    total_amount: item.total_amount,
    total_weight: item.total_weight,
    total_quantity: item.total_quantity,
    items_count: item.items_count,
    products_display: item.products_display,
    invoice_date: item.invoice_date
      ? new Date(item.invoice_date).toLocaleString()
      : "-",
  
  };
});

 
  return (
    <div className="page-container">
      <h2>Order Report</h2>

 <CommonTable
        title="Orders List"
        columns={columns}
        data={tableData}
        
        footer={
          <span>
            Showing 1 to {tableData.length} of {tableData.length} entries
          </span>
        }
      />
      {/* {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <CommonTable columns={columns} data={orders} />
      )} */}
    </div>
  );
}
