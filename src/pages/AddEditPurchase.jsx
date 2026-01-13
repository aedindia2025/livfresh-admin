import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getItems,
  getPurchaseSuppliers,
  getPurchaseById,
  postPurchase,
  editPurchase,
} from "../api/commonapi.js";

export default function AddEditPurchase() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [form, setForm] = useState({
    product: "",
    supplier: "",
    cost: "",
    qty: "",
    total: "",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  });

  /* ================= LOAD DROPDOWNS ================= */
useEffect(() => {
    const loadDropdowns = async () => {
      const itemsRes = await getItems();
      const suppliersRes = await getPurchaseSuppliers();
      setItems(itemsRes);
      setSuppliers(suppliersRes);
    };

    loadDropdowns();
  }, []);

  /* ================= EDIT MODE ================= */
  useEffect(() => {
    if (isEdit) {
      getPurchaseById(id).then((data) => {
        setForm({
          // product: data.product_id,
          // supplier: data.supplier_id,
           product: String(data.product),   // 👈 ID
          supplier: String(data.supplier),
           cost:  Number(data.cost).toFixed(2) || "",
          qty:  Number(data.qty).toFixed(2) || "",
          total:  Number(data.total).toFixed(2) || "",
          status: data.status || "Active",
          createdAt: data.created_at || "",
          updatedAt: data.updated_at || ""

        });
      });
    }
  }, [id, isEdit]);

  /* ================= AUTO TOTAL ================= */
  useEffect(() => {
    const total = Number(form.cost) * Number(form.qty);
    setForm((prev) => ({
      ...prev,
      total: total ? total.toFixed(2) : "",
    }));
  }, [form.cost, form.qty]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleStatus = () => {
    setForm((prev) => ({
      ...prev,
      status: prev.status === "Active" ? "Inactive" : "Active",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const payload = {
      product: Number(form.product),
      supplier: Number(form.supplier),
      cost: Number(form.cost).toFixed(2),
      qty: Number(form.qty).toFixed(2),
      total: Number(form.total).toFixed(2),
      status: form.status,
    
    };

    if (isEdit) {
      await editPurchase(id, payload);
    } else {
      await postPurchase(payload);
    }

    navigate("/purchased");
  };

  /* ================= UI ================= */
  return (
    <div className="page">
      <div className="form-header">
        <h2>{isEdit ? "Edit Purchase" : "Add Purchase"}</h2>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        {/* Product */}
        <div>
          <label>Product</label>
          <select
            name="product"
            value={form.product}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {items.map((item) => (
              <option key={item.item_id} value={item.item_id}>
                {item.item_name}
              </option>
            ))}
          </select>
        </div>

        {/* Supplier */}
        <div>
          <label>Supplier</label>
          <select
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((sup) => (
              <option key={sup.supplier_id} value={sup.supplier_id}>
                {sup.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cost */}
        <div>
          <label>Cost</label>
          <input
            type="number"
            step="0.01"
            name="cost"
            value={form.cost}
            onChange={handleChange}
          />
        </div>

        {/* qty */}
        <div>
          <label>Quantity</label>
          <input
            type="number"
             step="0.01"
            name="qty"
            value={form.qty}
            onChange={handleChange}
          />
        </div>

        {/* Total */}
        <div>
          <label>Total Amount</label>
          <input value={form.total} disabled />
        </div>

        {/* Status */}
        <div>
          <label>Status</label>
          <div
            className={`status-pill ${
              form.status === "Active" ? "active" : "inactive"
            }`}
            onClick={toggleStatus}
          >
            {form.status}
          </div>
        </div>

        {/* Dates */}
        {/* <div className="full dates">
          <div>
            <label>Creation Date</label>
            <div className="date-text">
              {form.createdAt || "Not available on creation"}
            </div>
          </div>
          <div>
            <label>Update Date</label>
            <div className="date-text">
              {form.updatedAt || "Not available on creation"}
            </div>
          </div>
        </div> */}

        {/* Actions */}
        <div className="full form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/purchased")}
          >
            Back
          </button>
          <button className="btn-primary">
            {isEdit ? "Update " : "Save "}
          </button>
        </div>
      </form>
    </div>
  );
}
