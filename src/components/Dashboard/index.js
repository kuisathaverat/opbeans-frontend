import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import { Link } from 'react-router';

import DashboardProductsList from '../DashboardProductsList';
import * as productActions from '../../actions/productActions';

import './style.css';

class Dashboard extends Component {

  componentDidMount() {
      this.props.actions.loadProductsTop();
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classnames('Dashboard', className)}>

          <div className="ui vertical stripe segment">
              <div className="ui middle aligned stackable grid container">
                  <div className="row">
                      <div className="eight wide column">
                          <h1 className="ui header">OpBeans Admin Dashboard</h1>
                          <p>The Sales & Inventory Management System for OpBeans Coffee Distribution Inc.</p>
                      </div>
                  </div>
                  <div className="row">
                      <div className="eight wide column">
                          <DashboardProductsList productsTop={this.props.productsTop} />
                      </div>
                  </div>
              </div>

          </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
    productsTop: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    // Sort products by 'sold'
    state.productsTop.items.sort((a, b) => {
        return b.sold - a.sold;
    });

    return {
        productsTop: state.productsTop
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(productActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
