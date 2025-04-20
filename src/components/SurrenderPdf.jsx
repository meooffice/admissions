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

const SurrenderPdf = ({ data }) => (
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
          Sub:- Education - Secondary Education - Earned Leave – Sanction Surrender of Earned Leave According Permission for the Surrender of Earned Leave to Certain Teaching and
          Non–Teaching Staff of ZPHS P Kottam - orders issued.
        </Text>
        <Text style={styles.additionalText}>
          Ref:- 1. G.O.Ms.No.40, Edn, dt.07-05-2002{"\n"}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Cir.Memo.No.14781-C/278/FR.I/2011, Finance (FR.I) Department,DT.22-6-2011{"\n"}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.  G.O.No. 180 School Education Dated: 18-11-2022.{"\n"}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.  Applications from the concerned staff.{"\n"}         
        </Text>
        <Text style={[styles.header]}>**************</Text>

        <Text style={styles.additionalText}>&nbsp;&nbsp;&nbsp;ORDER:</Text>
        <Text style={styles.additional}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          In the Memo 1st cited Government have permitted Teachers to Surrender of Earned Leave.
        </Text>
        <Text style={styles.additional}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          In this connection the following Teaching Staff of Z.P.High School, P. Kottam are here accorded permission to Surrender Earned Leave for purpose of Encashment as detailed in the Annexure
        </Text>
        <Text style={styles.additional}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          This is to certify that none of the staff members who are surrendering 30 days of Earned Leave during the current year have surrendered any leave in the previous year.
        </Text>
        
        <Text style={[styles.header, styles.underline]}>Annexure</Text>

        {/* Table Header */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Name</Text>
            <Text style={styles.tableCellHeader}>Designation</Text>
            <Text style={styles.tableCellHeader}>Basic Pay</Text>
            <Text style={styles.tableCellHeader}>Available E.L.</Text>
            <Text style={styles.tableCellHeader}>Surrendered Leave Days</Text>
            <Text style={styles.tableCellHeader}>Leave Balance</Text>
            <Text style={styles.tableCellHeader}>Effective Date From</Text>
            <Text style={styles.tableCellHeader}>Effective Date To</Text>
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
          Necessary entries are made in the Service Registers of the Individuals.It is hereby brought to the notice of all concerned that these orders are subject to audit objections that may be raised by the Treasury authorities. Any excess amount paid, if found, will be recovered in lump sum without prior notice.
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

export default SurrenderPdf;