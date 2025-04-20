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
    marginVertical: 10,
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
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left', // Center-align the additional text
    fontStyle: 'italic',
    paddingLeft: 60,
  },
  additional: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left', // Center-align the additional text
    fontStyle: 'italic',
    textAlign: 'justify',
      },
});

const IncrementPdf = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Center-align the header */}
      <Text style={styles.header}>Proceedings of the Headmaster ZPHS P. Kottam, Kotananduru</Text>

      {/* Center-align the present section with underline */}
      <Text style={[styles.header, styles.underline]}>
        Present: Sri {data.ddo_name}
      </Text>

      {/* Row with Proc.Rc.No aligned left and Date aligned right */}
      <View style={styles.row}>
        <Text style={styles.leftText}>
          Proc.Rc.No: {data.proceeding_no}
        </Text>
        <Text style={styles.rightText}>
          Date: {data.date}
        </Text>
      </View>

      {/* Break line */}
      <View style={styles.line} />

      {/* Additional text above the table */}
      <Text style={styles.additionalText}>
        Sub:- Education - Secondary Education - Sanction of Annual Grade Increment to the 
        staff of ZPHS P. Kottam - orders issued.
      </Text>
      <Text style={styles.additionalText}>
          Ref:- 1. G.O.Ms.No.40, Edn, dt.07-05-2002{"\n"}
          &nbsp;&nbsp;2. Application of the individuals.{"\n"}
         </Text>
      <Text style={[styles.header]}>
      **************
      </Text>

      <Text style={styles.additionalText}>
      &nbsp;&nbsp;&nbsp;
        ORDER:
      </Text>
      <Text style={styles.additional}>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      As per the provisions contained in the reference cited,the Headmaster 
      ZPHS P. Kottam,  is pleased to sanction Annual Grade Increment  
      to the staff of ZPHS P. Kottam. 
      Hence the Incumbents are here by  sanctioned their Annual Grade Increments  
      as per the annexure shown below.
		 </Text>
     <Text style={[styles.header, styles.underline]}>
       Annexure
      </Text>

      {/* Table with headers and data */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Name</Text>
          <Text style={styles.tableCellHeader}>Designation</Text>
          <Text style={styles.tableCellHeader}>Present Pay</Text>
          <Text style={styles.tableCellHeader}>Scale of Pay</Text>
          <Text style={styles.tableCellHeader}>Present Pay</Text>
          <Text style={styles.tableCellHeader}>Rate of Increment</Text>
          <Text style={styles.tableCellHeader}>Future Pay</Text>
          <Text style={styles.tableCellHeader}>Date of Effect</Text>
          <Text style={styles.tableCellHeader}>Remarks</Text>
        </View>

        {/* Table Data */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{data.name}</Text>
          <Text style={styles.tableCell}>{data.designation}</Text>
          <Text style={styles.tableCell}>{data.present_pay}</Text>
          <Text style={styles.tableCell}>{data.pay_scale}</Text>
          <Text style={styles.tableCell}>{data.present_pay}</Text>
          <Text style={styles.tableCell}>{data.rate_increment}</Text>
          <Text style={styles.tableCell}>{data.future_pay}</Text>
          <Text style={styles.tableCell}>{data.effect_date}</Text>
          <Text style={styles.tableCell}>&nbsp;&nbsp;</Text> {/* Remarks can be modified or kept blank */}
        </View>
      </View>

      {/* Additional text below the table */}
      <Text style={styles.additional}>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Necessary entries are made in the Service Registers of the Individuals. 
      If any excess paid in this regard that amount will be recovered from the 
      individual lump sum without any notice.
      </Text>

      {/* Signature section */}
      <Text style={styles.signature}>
        Signature of the HM
      </Text>
      <Text style={styles.copy}>
       Copy to:
      </Text>
      <Text style={styles.copy}>
       1. Individual		
      </Text><Text style={styles.copy}>
       2. Stock file.	       
      </Text><Text style={styles.copy}>
       3. The STO.
      </Text>
    </Page>
  </Document>
);

export default IncrementPdf;
