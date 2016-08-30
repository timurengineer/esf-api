import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class InvoiceList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Seller</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.invoices.map((item) => (
              <TableRow key={item.invoiceId}>
              <TableRowColumn>{item.registrationNumber}</TableRowColumn>
              <TableRowColumn>{item.invoice.sellers.seller[0].name}</TableRowColumn>
              <TableRowColumn>{item.invoice.invoiceType}</TableRowColumn>
              <TableRowColumn>{item.invoice.productSet.totalPriceWithTax}</TableRowColumn>
              <TableRowColumn>{item.invoiceStatus}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

//window.InvoiceList = InvoiceList;
export default InvoiceList;