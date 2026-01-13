// import { useState } from "react";
// import CommonTable from "../components/CommonTable";
// import { FaEye, FaTrash } from "react-icons/fa";

// export default function Sales() {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSale, setSelectedSale] = useState(null);

//   const columns = [
//     { key: "customer", label: "Customer" },
//     { key: "datetime", label: "Date & Time" },
//     { key: "product", label: "Product" },
//     { key: "total", label: "Total" },
//     { key: "qty", label: "Qty" },
//   ];

//   const salesData = [
//     {
//       id: "DS-001",
//       customer: "Direct",
//       datetime: "26-12-2025 15:14",
//       product: "Barracuda",
//       qty: "1.100",
//       rate: 229,
//       subTotal: 251.9,
//       total: 264.5,
//       paid: 265,
//       change: 0.5,
//       paymentMode: "Cash",
//       cashier: "admin",
//     },
//     {
//       id: "DS-002",
//       customer: "Direct",
//       datetime: "26-12-2025 14:45",
//       product: "Dry King Fish",
//       qty: "1.000",
//       rate: 134,
//       subTotal: 134,
//       total: 134,
//       paid: 134,
//       change: 0,
//       paymentMode: "Cash",
//       cashier: "admin",
//     },
//   ];

//   return (
//     <div className="sales-page">
//       {/* PAGE HEADER */}
//       <div className="sales-header">
//         <h2>Sales</h2>
//       </div>

//       {/* COMMON TABLE */}
//       <CommonTable
//         title="Sales List"
//         columns={columns}
//         data={salesData.map((s) => ({
//           ...s,
//           total: `₹${s.total}`,
//         }))}
//         actions={(row) => (
//           <>
//             <button
//               className="view"
//               title="View"
//               onClick={() => {
//                 setSelectedSale(row);
//                 setShowModal(true);
//               }}
//             >
//               <FaEye />
//             </button>
//             <button className="delete" title="Delete">
//               <FaTrash />
//             </button>
//           </>
//         )}
//         footer={<span>Showing {salesData.length} entries</span>}
//       />

//       {showModal && selectedSale && (
//   <div className="modal-overlay">
//     <div className="modal-box">
//       <h3 className="title_style">Transaction Receipt</h3>

//       {/* RECEIPT PAPER */}
//       <div className="receipt-paper" id="print-receipt">
//         <pre>
//           <div className="receipt_top p_top"> 
//               <h2>LIVE FISH STORE</h2>
//               <p>123 Business Street, City - 600001</p>
//               <b> Ph: +91 98765 43210 | GSTIN: GST123456789</b>

//           </div>
//             <div className="">
//               <div className=" p_top p_bottom">
//                 <p><b>Invoice:</b> {selectedSale.id}                                     January 09, 2026</p>
//                 <p><b>Customer: </b>                                                               {selectedSale.customer}</p>
//               </div>
//               <div className="border_bottom p_top p_bottom">
//                 <p><b>ITEMS</b></p>
//                 <p><b>Anchovy (Dried)  </b>                                                <b> 214.00</b></p>
//                 <p className="no_return">1.00 x 214.00</p>
//               </div>
//               <div className="border_bottom p_top p_bottom">
//               <p>Sub Total                                                                 214.00</p>
//               <p className="total_style">Total                                                          214.00</p>

//               </div>
//             <div className="p_bottom border_bottom p_top p_bottom" >
//               <p>Payment Mode                                                          Cash</p>
//               <p>Cashier                                                                    admin</p>
//             </div>
//             </div>
//             <div className="receipt_thanks p_top border_top p_bottom">
//               <p>Thank you! Visit again.</p>
//               <p className="no_return">No returns or exchanges. Prices include all taxes.</p>
//             </div>

//         </pre>
//       </div>

//       {/* BUTTONS */}
//       <div className="modal-actions no-print">
//         <button className="btn-primary" onClick={() => window.print()}>
//           🖨 Print Receipt
//         </button>
//         <button className="btn-secondary" onClick={() => setShowModal(false)}>
//           ✖ Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}



//       {/* PAGE-ONLY STYLES */}
//       <style>{`
//       .receipt-paper{ border:1px solid #c9c9c9; border-rdius:2px; background-color:#fff;}
//       .border_top{ border-top:2px solid #000;}
//       .border_bottom{ border-top:1px dashed #000;}
//       .total_style{ font-size:14px; font-weight:600}
//       .title_style{ text-align:center;}
//       .p_top{ padding-top:5px;}
//       .p_top p{ padding-top:4px;}
//       .p_bottom{padding-bottom:5px;}
//       .no_return{ font-size:10px;}
//       .receipt_thanks{ text-align:center}
//         .receipt_top{ text-align:center;    border-bottom: 2px solid #000;    padding-bottom: 10px;}
//         .sales-page {
//           padding: 20px;
//           font-family: Inter, sans-serif;
//         }

//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.6);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 999;
//         }

//         .modal-box {
//           background: #fff;
//           padding: 20px;
//           width: 380px;
//           border-radius: 8px;
//         }

//         .modal-box h3 {
//           margin-bottom: 10px;
//         }

//        pre {
//   font-family: monospace;
//   font-size: 12px;
//   background: #f9fafb;
//   padding: 12px;
//   white-space: pre-wrap;   /* ✅ FIX */
//   word-wrap: break-word;  /* ✅ FIX */
// }


//         .modal-actions {
//           display: flex;
//           justify-content: space-between;
//           margin-top: 10px;
//         }

//         .modal-actions button {
//           padding: 6px 12px;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//           /* ===== THERMAL BILL PRINT ===== */
// @media print {

//   body {
//     margin: 0;
//     padding: 0;
//     background: #fff;
//   }

//   .receipt-print {
//       border-radius: 2px;
//     border: 1px solid #cdcdcd;
//     width: 80mm;              /* ✅ REAL BILL WIDTH */
//     margin: 0 auto;
//     font-family: monospace;
//     font-size: 11px;
//     color: #000;
//   }

//   .receipt-header h4 {
//     font-size: 13px;
//     font-weight: bold;
//     margin-bottom: 4px;
//   }

//   .receipt-header p {
//     font-size: 10px;
//   }

//   hr {
//     border: none;
//     border-top: 1px dashed #000;
//     margin: 6px 0;
//   }

//   .receipt-body {
//     font-size: 11px;
//     line-height: 1.4;
//   }

//   .receipt-footer-text p {
//     font-size: 10px;
//   }
// }
// @media print {

//   @page {
//     margin: 0;
//   }

//   html, body {
//     margin: 0;
//     padding: 0;
//     background: #fff;
//   }

//   /* HIDE EVERYTHING */
//   body * {
//     visibility: hidden;
//   }

//   /* SHOW ONLY RECEIPT */
//   #print-receipt,
//   #print-receipt * {
//     visibility: visible;
//   }

//   #print-receipt {
//     position: absolute;
//     left: 50%;
//     top: 10mm;
//     transform: translateX(-50%);
//     width: 80mm;
//     font-family: monospace;
//     font-size: 11px;
//   }

//   /* NEVER PRINT BUTTONS */
//   .no-print {
//     visibility: hidden;
//   }
// }


//       `}</style>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import CommonTable from "../components/CommonTable";
import { FaEye, FaTrash } from "react-icons/fa";
import { getSalesList, deleteSale } from "../api/commonapi";
import Swal from "sweetalert2";



export default function Sales() {
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const columns = [
    { key: "customer", label: "Customer" },
    { key: "datetime", label: "Date & Time" },
    { key: "product", label: "Product" },
    { key: "qty", label: "Qty" },
    { key: "total", label: "Total" },
  ];

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getSalesList();
        setSales(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Sales API error", err);
      }
    };
    fetchSales();
  }, []);

  const tableData = sales.map((s) => ({
    id: s.sale_id,
    customer: s.customer,
    datetime: s.date_and_time,
    product: s.products,
    qty: s.total_items_quantity,
    rate: s.rate,
    subTotal: s.sub_total,
    total: s.total_amount,
    paymentMode: s.payment_mode,
    cashier: s.cashier,
  }));
const handleDelete = async (saleId) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This sale will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  const success = await deleteSale(saleId);

  if (success) {
    // UI update without refetch
    setSales((prev) =>
      prev.filter((sale) => sale.sale_id !== saleId)
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Sale has been deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Failed to delete sale",
    });
  }
};

  

  return (
    <div className="sales-page">
      <h2>Sales</h2>

      <CommonTable
        title="Sales List"
        columns={columns}
        data={tableData.map((r) => ({ ...r, total: `₹${r.total}` }))}
        actions={(row) => (
          <>
            <button
              className="view"
              title="View"
              onClick={() => {
                setSelectedSale(row);
                setShowModal(true);
              }}
            >
              <FaEye />
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
        footer={<span>Showing {tableData.length} entries</span>}
      />

      {/* ================= RECEIPT MODAL ================= */}
      {showModal && selectedSale && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="title_style">Transaction Receipt</h3>

            <div className="receipt-paper" id="print-receipt">
              <div className="center">
                <h4>LIVE FISH STORE</h4>
                <p>123 Business Street, City - 600001</p>
                <p>Ph: +91 98765 43210 | GSTIN: GST123456789</p>
              </div>

              <hr />

              <div className="row">
                <span>Invoice</span>
                <span>{selectedSale.id}</span>
              </div>
              <div className="row">
                <span>Date</span>
                <span>{selectedSale.datetime}</span>
              </div>
              <div className="row">
                <span>Customer</span>
                <span>{selectedSale.customer}</span>
              </div>

              <hr />

              <p className="section-title">ITEMS</p>

              <div className="row bold">
                <span>{selectedSale.product}</span>
                <span>₹{selectedSale.total}</span>
              </div>

              <div className="row small">
                <span>
                  {selectedSale.qty} × ₹{selectedSale.rate}
                </span>
              </div>

              <hr />

              <div className="row">
                <span>Sub Total</span>
                <span>₹{selectedSale.subTotal}</span>
              </div>

              <div className="row bold">
                <span>Total</span>
                <span>₹{selectedSale.total}</span>
              </div>

              <hr />

              <div className="row">
                <span>Payment Mode</span>
                <span>{selectedSale.paymentMode}</span>
              </div>

              <div className="row">
                <span>Cashier</span>
                <span>{selectedSale.cashier}</span>
              </div>

              <hr />

              <p className="center small">
                Thank you! Visit again.
                <br />
                No returns or exchanges. Prices include all taxes.
              </p>
            </div>

            <div className="modal-actions no-print">
              <button onClick={() => window.print()}>🖨 Print</button>
              <button onClick={() => setShowModal(false)}>✖ Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style>{`
        .sales-page {
          padding: 20px;
          font-family: Inter, sans-serif;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal-box {
          background: #fff;
          padding: 20px;
          width: 380px;
          border-radius: 8px;
        }

        .title_style {
          text-align: center;
          margin-bottom: 10px;
        }

        .receipt-paper {
          border: 1px solid #ccc;
          padding: 12px;
          font-family: monospace;
          font-size: 13px;
        }

        .center {
          text-align: center;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin: 4px 0;
        }

        .bold {
          font-weight: bold;
        }

        .small {
          font-size: 12px;
        }

        .section-title {
          font-weight: bold;
          margin-top: 6px;
        }

        hr {
          border: none;
          border-top: 1px dashed #999;
          margin: 8px 0;
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .modal-actions button {
          padding: 6px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          #print-receipt,
          #print-receipt * {
            visibility: visible;
          }
          #print-receipt {
            position: absolute;
            left: 50%;
            top: 10mm;
            transform: translateX(-50%);
            width: 80mm;
          }
          .no-print {
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
}