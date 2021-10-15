import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './Header-Footer/Header';
import Footer from './Header-Footer/Footer';
import Login from './Login/Login';
import CreateOrderStep2 from './Order/CreateOrderStep2';
import OrderList from './Order/OrderList';
import OrderDetailedView from './Order/OrderDetailedView';
import CreateReceipt from './Supplier/Receipt';
import ViewOrders from './Supplier/ViewOrders';
import SupplierOrderDetailedView from './Supplier/SupplierOrderDetailedView';
import CreateCreditNote from './CreditNote/CreditNote';
import CreateOrder from './Order/CreateOrder';
import SiteSelector from './Header-Footer/SiteSelector';
import { Container } from 'react-bootstrap';
import ReceiptDetailedView from "./Supplier/ReceiptDetailedView";
import ViewAllItems from "./Supplier/ViewAllItems";
import ViewAllSuppliers from "./Supplier/ViewAllSuppliers";
import ReceiptList from "./Order/ReceiptList";
import CreditNoteDetailedView from "./CreditNote/CreditNoteDetailedView";
import CreditNoteList from "./CreditNote/CreditNoteList";
import PaymentList from "./Payment/PaymentList";
import CreatePayment from "./Payment/CreatePayment";
import SupplierDashBoard from "./Dashboards/SupplierDashBoard";
import AcceptedOrderList from "./Supplier/AcceptedOrders";
import RejectedOrderList from "./Supplier/RejectedOrders";
import SeniorDashBoard from "./Dashboards/SeniorDashBoard";
import SiteManagerDashBoard from "./Dashboards/SiteManagerDashBoard";
import ProcurementDashBoard from "./Dashboards/ProcurementDashBoard";
import ProcOrderList from "./Order/ProcOrderList";
import SeniorOrderList from "./Order/SeniorOrderList";

class FrontEnd extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/orderList" component={OrderList} />
            <Route path="/CreateOrder-step2" component={CreateOrderStep2} />
            <Route path="/siteOrders" component={OrderList} />
            <Route
              path="/orderDetailedView/:id"
              component={OrderDetailedView}
            />
            <Route path="/senior" component={OrderList} />
            <Route path="/createReceipt/:id" component={CreateReceipt} />
            <Route path="/supplierOrders" component={ViewOrders} />
            <Route
              path="/supplierOrderView/:id"
              component={SupplierOrderDetailedView}
            />
            <Route path="/creditNote/:id/:site/:supplier" component={CreateCreditNote} />
            <Route path="/step2" component={CreateReceipt} />
            <Route path="/creditNoteDetailedView/:id" component={CreditNoteDetailedView}/>
            <Route path="/creditNoteList/:id/:site/:supplier" component={CreditNoteList}/>

            <Route
              path="/supplierOrderView"
              component={SupplierOrderDetailedView}
            />
            <Route path="/creditNote/:id/:site/:supplier" component={CreateCreditNote} />
            <Route path="/createOrder/:id" component={CreateOrder} />
            <Route path="/createOrder" component={CreateOrder} />
            <Route path="/receipt/:id" component={CreateReceipt} />
            <Route path="/receiptDetailedView/:id" component={ReceiptDetailedView}/>
            <Route path="/supplierAllItems" component={ViewAllItems}/>
            <Route path="/allSuppliers" component={ViewAllSuppliers}/>
            <Route path="/receiptList/:id" component={ReceiptList}/>
            <Route path="/payment" component={CreatePayment}/>
            <Route path="/paymentList" component={PaymentList}/>
            <Route path="/supplierDashBoard" component={SupplierDashBoard}/>
            <Route path="/seniorDashBoard" component={SeniorDashBoard}/>
            <Route path="/siteManagerDashBoard" component={SiteManagerDashBoard}/>
            <Route path="/procurementDashBoard" component={ProcurementDashBoard}/>
            <Route path="/acceptedOrders" component={AcceptedOrderList}/>
            <Route path="/rejectedOrders" component={RejectedOrderList}/>
            <Route path="/procOrderList" component={ProcOrderList}/>
            <Route path="/seniorOrderList" component={SeniorOrderList}/>
            <Route path="/payments" component={PaymentList}/>
          </Switch>
        </Container>

        {/* <Footer /> */}
      </Router>
    );
  }
}

export default FrontEnd;
