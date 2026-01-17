import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import POS from "./pages/pos";

// CATEGORY
import Category from "./pages/category";
import AddCategory from "./pages/AddCategory";

// PRODUCTS
import Products from "./pages/products";
import AddEditProduct from "./pages/AddEditProduct";

// SUPPLIERS
import SupplierList from "./pages/suppliers";
import AddEditSupplier from "./pages/AddEditSupplier";

// CUSTOMERS
import Customer from "./pages/customer";       // list page
import AddEditCustomer from "./pages/AddEditCustomer"; // add/edit page

// SALES & PURCHASE
import Sales from "./pages/sales";
import SalesReport from "./pages/salesreport";
import Purchased from "./pages/purchased";
import AddEditPurchase from "./pages/AddEditPurchase";

// REPORTS & MISC
import PurchaseReport from "./pages/purchasereport";
import ProfitReport from "./pages/profitreport";
import OrderReport from "./pages/orderreport";
import Misc from "./pages/misc";

import "./assets/css/common-table.css";
import "./assets/css/style.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* POS – FULL SCREEN */}
        <Route path="/pos" element={<POS />} />

        {/* DASHBOARD LAYOUT */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          {/* CATEGORY */}
          <Route path="category" element={<Category />} />
          <Route path="category/add" element={<AddCategory />} />
          <Route path="category/edit/:id" element={<AddCategory />} />

          {/* PRODUCTS */}
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddEditProduct />} />
          <Route path="products/edit/:id" element={<AddEditProduct />} />

          {/* SUPPLIERS */}
          <Route path="suppliers" element={<SupplierList />} />
          <Route path="suppliers/add" element={<AddEditSupplier />} />
          <Route path="suppliers/edit/:id" element={<AddEditSupplier />} />

          {/* CUSTOMERS */}
          <Route path="customer" element={<Customer/>} />
          <Route path="customers/add" element={<AddEditCustomer />} />
          <Route path="customers/edit/:id" element={<AddEditCustomer />} />

          {/* SALES */}
          <Route path="sales" element={<Sales />} />
          <Route path="salesreport" element={<SalesReport />} />

          {/* PURCHASE */}
          <Route path="purchased" element={<Purchased />} />
          <Route path="purchased/add" element={<AddEditPurchase />} />
          <Route path="purchased/edit/:id" element={<AddEditPurchase />} />

          {/* MISC & REPORTS */}
          <Route path="misc" element={<Misc />} />
          <Route path="purchasereport" element={<PurchaseReport />} />
          <Route path="profitreport" element={<ProfitReport />} />
          <Route path="orderreport" element={<OrderReport />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
