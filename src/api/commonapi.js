import axios from "axios";

const API_URL = "http://192.168.0.123:8004/api";

// ================= CATEGORY API =================
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/master/categories/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Category API Error:", error);
    return [];
  }
};

export const postCategories = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/master/categories/`, data);
    return response.data;
  } catch (error) {
    console.error("Category API Error:", error.response?.data);
    throw error;
  }
};

export const editCategories = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/master/categories/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Category API Error:", error.response?.data);
    throw error;
  }
};

export const deleteCategories = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/master/categories/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Delete categories  Error:", error.response?.data);
    throw error;
  }
};


export const getCategoryById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/master/categories/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Get Category By ID Error:", error.response?.data);
    throw error;
  }
};

// ================= ITEMS API =================
export const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/master/items/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Item API Error:", error);
    return [];
  }
};

export const getItemsById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/master/items/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Get Items Error:", error.response?.data);
    throw error;
  }
};


export const deleteItems= async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/master/items/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Delete Items  Error:", error.response?.data);
    throw error;
  }
};

export const postItems = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/master/items/`, data);
    return res.data;
  } catch (error) {
    console.error("Create items Error:", error.response?.data);
    throw error;
  }
};

export const editItems = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/master/items/${id}/`, data);
    return res.data;
  } catch (error) {
    console.error("Update items Error:", error.response?.data);
    throw error;
  }
};

// ================= CUSTOMERS API =================
export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customer/customers/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Customer API Error:", error);
    return [];
  }
};

export const getCustomerById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/customer/customers/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Get Customer By ID Error:", error.response?.data);
    throw error;
  }
};

export const postCustomer = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/customer/customers/`, data);
    return response.data;
  } catch (error) {
    console.error("Add Customer API Error:", error.response?.data);
    throw error;
  }
};

export const editCustomer = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/customer/customers/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Edit Customer API Error:", error.response?.data);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/customer/customers/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Delete Customer API Error:", error.response?.data);
    throw error;
  }
};

// ================= PROFIT REPORT API =================
export const getProfitReport = async (filter = {}) => {
  try {
    const response = await axios.get("/api/profit-report", { params: filter });

    if (response.data && Array.isArray(response.data.data)) return response.data.data;
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching profit report:", error);
    return [];
  }
};

// ================= ORDER REPORT API =================

export const getOrderReport = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders/orders/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Category API Error:", error);
    return [];
  }
};
// ================= PURCHASE API =================

export const getPurchaseById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/purchase/purchases/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Get Purchase Error:", error.response?.data);
    throw error;
  }
};

export const postPurchase = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/purchase/purchases/`, data);
    return res.data;
  } catch (error) {
    console.error("Create Purchase Error:", error.response?.data);
    throw error;
  }
};

export const editPurchase = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/purchase/purchases/${id}/`, data);
    return res.data;
  } catch (error) {
    console.error("Update Purchase Error:", error.response?.data);
    throw error;
  }
};


export const getPurchase = async () => {
  try {
    const response = await axios.get(`${API_URL}/purchase/purchases/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Category API Error:", error);
    return [];
  }
};


export const deletePurchase = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/purchase/purchases/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Delete Purchase Error:", error.response?.data);
    throw error;
  }
};


// Get sales list (Sales List page)
export const getSalesList = async () => {
  try {
    const response = await axios.get(`${API_URL}/sales/sales/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Sales List API Error:", error);
    return [];
  }
};

export const deleteSale = async (saleId) => {
  try {
    await axios.delete(`${API_URL}/sales/sales/${saleId}/`);
    return true;
  } catch (error) {
    console.error("Delete Sale API Error:", error);
    return false;
  }
};






 // GET – Supplier List
export const getPurchaseSuppliers = async () => {
  try {
    const response = await axios.get(`${API_URL}/purchase/suppliers/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Get Suppliers Error:", error);
    return [];
  }
};

// GET – Single Supplier (Edit page)
export const getPurchaseSupplierById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/purchase/suppliers/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Get Supplier Error:", error);
    return null;
  }
};

// POST – Add Supplier
export const createPurchaseSupplier = async (payload) => {
  try {
    const response = await axios.post(
      `${API_URL}/purchase/suppliers/`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Create Supplier Error:", error);
    throw error;
  }
};

// PUT – Update Supplier
export const updatePurchaseSupplier = async (id, payload) => {
  try {
    const response = await axios.put(
      `${API_URL}/purchase/suppliers/${id}/`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Update Supplier Error:", error);
    throw error;
  }
};

// DELETE – Delete Supplier
export const deletePurchaseSupplier = async (id) => {
  try {
    await axios.delete(`${API_URL}/purchase/suppliers/${id}/`);
    return true;
  } catch (error) {
    console.error("Delete Supplier Error:", error);
    return false;
  }
};
