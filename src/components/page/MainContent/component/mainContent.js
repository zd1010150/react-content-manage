/* eslint-disable react/no-typos */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Order, MarketingMaterials, Accounts, Leads, PriceSetting, TrackOrders } from 'views/index';

const mainContentView = () => (
  <Switch>
    <Route path="/clientLists/order" component={Order} />
    <Route path="/clientLists/marketingMaterial" component={MarketingMaterials} />
    <Route path="/clientLists/accounts" component={Accounts} />
    <Route path="/clientLists" component={Leads} />
    <Route path="/clientLists/leads" component={Leads} />
    <Route path="/priceSetting" component={PriceSetting} />
    <Route path="/trackOrders" component={TrackOrders} />
  </Switch>
);
export default mainContentView;
