import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center', // Center-align the header text
  },
  underline: {
    textDecoration: 'underline',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items to the left and right
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0', // Light gray background for header cells
    borderWidth: 1,
    borderColor: '#000', // Border for header cells
    borderStyle: 'solid',
    textAlign: 'center', // Center-align the text
  },
  
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    borderWidth: 1,
    borderColor: '#000', // Border for data cells
    borderStyle: 'solid',
  },
  signature: {
    textAlign: 'right',
    marginRight: 20,
    marginTop: 30,
    fontWeight: 'bold',
  },
  copy: {
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 5,
    fontWeight: 'bold',
  },
  additionalText: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'left', // Center-align the additional text
    fontStyle: 'italic',
    paddingLeft: 60,
  },
  additional: {
    marginTop: 5,
    marginBottom: 5,
    fontStyle: 'italic',
    textAlign: 'justify',
      },
});

const IncrementPdf = ({ data }) => (
  <Document>
    {data.length > 0 && (
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.header}>
          Proceedings of the Headmaster ZPHS P Kottam, Kotananduru
        </Text>
        <Text style={[styles.header, styles.underline]}>
          Present: Sri/Smt/Kum {(' ')}{data[0].ddo_name}
        </Text>

        <View style={styles.row}>
          <Text style={styles.leftText}>Proc.Rc.No: {data[0].proceeding_no}</Text>
          <Text style={styles.rightText}>Date: {data[0].date}</Text>
        </View>

        <View style={styles.line} />

        <Text style={styles.additionalText}>
          Sub:- Education - Secondary Education - Sanction of Annual Grade Increment to the staff of ZPHS P Kottam - orders issued.
        </Text>
        <Text style={styles.additionalText}>
          Ref:- 1. G.O.Ms.No.40, Edn, dt.07-05-2002{"\n"}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Application of the individuals.
        </Text>
        <Text style={[styles.header]}>**************</Text>

        <Text style={styles.additionalText}>&nbsp;&nbsp;&nbsp;ORDER:</Text>
        <Text style={styles.additional}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          As per the provisions contained in the reference cited, the Headmaster ZPHS P. Kottam, is pleased to sanction Annual Grade Increment to the staff of ZPHS P. Kottam.
          Hence the Incumbents are hereby sanctioned their Annual Grade Increments as per the annexure shown below.
        </Text>
        <Text style={[styles.header, styles.underline]}>Annexure</Text>

        {/* Table Header */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Name</Text>
            <Text style={styles.tableCellHeader}>Designation</Text>
            <Text style={styles.tableCellHeader}>Scale of Pay</Text>
            <Text style={styles.tableCellHeader}>Present Pay</Text>
            <Text style={styles.tableCellHeader}>Rate of Increment</Text>
            <Text style={styles.tableCellHeader}>Future Pay</Text>
            <Text style={styles.tableCellHeader}>Effect Date</Text>
            <Text style={styles.tableCellHeader}>Next Increment Date</Text>
          </View>

          {/* Table Data */}
          {data.map((employee, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{employee.name}</Text>
              <Text style={styles.tableCell}>{employee.designation}</Text>
              <Text style={styles.tableCell}>{employee.pay_scale}</Text>
              <Text style={styles.tableCell}>{employee.present_pay}</Text>
              <Text style={styles.tableCell}>{employee.rate_increment}</Text>
              <Text style={styles.tableCell}>{employee.future_pay}</Text>
              <Text style={styles.tableCell}>{employee.effect_date}</Text>
              <Text style={styles.tableCell}>{employee.next_date}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.additional}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Necessary entries are made in the Service Registers of the Individuals. If any excess paid in this regard that amount will be recovered from the individual lump sum without any notice.
        </Text>

        {/* Signature section */}
        <Text style={styles.signature}>Signature of the HM</Text>
        <Text style={styles.copy}>Copy to:</Text>
        <Text style={styles.copy}>1. Individual</Text>
        <Text style={styles.copy}>2. Stock file.</Text>
        <Text style={styles.copy}>3. The STO.</Text>
      </Page>
    )}
  </Document>
);

export default IncrementPdf;