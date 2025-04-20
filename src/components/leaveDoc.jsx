import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment'; // Import moment.js for date parsing

// Define styles for the document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    pageBreakInside: 'avoid', // Prevent header breaking across pages
  },
  underline: {
    textDecoration: 'underline',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
  line: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    pageBreakInside: 'avoid', // Prevent line from splitting
  },
  additionalText: {
    marginVertical: 8,
    lineHeight: 1.5,
    textAlign: 'justify',
    paddingLeft: 50,
    pageBreakInside: 'avoid', // Ensure this text block doesn't break across pages
  },
  // Table and cell styles
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#000',
    pageBreakInside: 'avoid', // Ensure entire table stays on one page
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    flex: 1,
    padding: 5,
    backgroundColor: '#d3d3d3', // Light grey background for headers
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  lastTableCell: {
    borderRightWidth: 0, // No border on the right for the last cell
  },
  signature: {
    marginTop: 15,
    textAlign: 'right',
    pageBreakInside: 'avoid', // Prevent the signature from breaking across pages
  },
  copy: {
    marginTop: 5,
    pageBreakInside: 'avoid', // Ensure this block stays together
  },
  additional: {
    marginVertical: 10,
    lineHeight: 1.5,
    marginTop: 5,
    marginBottom: 5,
    fontStyle: 'italic',
    textAlign: 'justify',
    pageBreakInside: 'avoid', // Ensure this text block doesn't break across pages
  },
});

// Function to calculate the number of days between two dates and add one day
const calculateDays = (fromDate, toDate) => {
  const from = moment(fromDate, 'DD-MM-YYYY');
  const to = moment(toDate, 'DD-MM-YYYY');

  if (!from.isValid() || !to.isValid()) {
    return "Invalid Date";
  }

  const daysDiff = to.diff(from, 'days') + 1;

  return daysDiff;
};

const LeaveDoc = ({ data }) => {
  const totalDays = calculateDays(data.from_date, data.to_date);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Center-align the header */}
        <Text style={styles.header}>
          Proceedings of the Headmaster Z P P HIGH SCHOOL- P KOTTAM, KOTANANDURU
        </Text>

        {/* Center-align the present section with underline */}
        <Text style={[styles.header, styles.underline]}>
          Present: Sri/Smt/Kum {data.ddo_name}
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

        {/* Additional text */}
        <Text style={styles.additionalText}>
          Sub:- APESS- Sanction of {data.type_of_leave} leave to {data.name}, 
          {data.designation}, ZPHS P Kottam - sanction - orders - issued.
        </Text>

        <Text style={styles.additionalText}>
          {data.type_of_leave === "Meternity" && (
            <>
              Ref :- 1. G.O. Ms .No.295, Dt13.5.1985{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. G.O.Ms.No. 152 Date:04. 05. 2010.{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. G.O.MS .NO.40 (Edn), Dt: 07.05.2002{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. Application of the individual.{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. Medical Certificate.{"\n"}
            </>
          )}
          {data.type_of_leave === "Peternity" && (
            <>
              Ref :- 1.G.O.Ms.No. 40 (Edn), dt.07.05.2002.{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. G.O.Ms.No.231, FIN & PLANING DEPT. DT.16-9-2005{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Cir.memo No.20129-C/454/FR.1/2010 Dated:21-07-2010{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.Medical Certificate dated:{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. Application of the individual.{"\n"}
            </>
          )}
          {data.type_of_leave === "EOL" && (
            <>
              Ref :- 1.G.O.Ms.No. 214 (F&P), dt.03.09.1996{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. G.O.Ms.No. 234 (F&P), dt.27.05.1994{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. G.O.Ms.No. 40 (Edn), dt.07.05.2002.{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. Medical Certificate{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. Requisition of the individual.{"\n"}
            </>
          )}
          {data.type_of_leave === "Commutation" && (
            <>
              Ref :- 1. G.O.Ms.No.40,Edn, dt.07-05-2002{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. G.O.Ms.No:186,Dt:23/07/1975.& A.P.Leave Rules.{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Medical Certificate.{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. Application of the individual.{"\n"}
            </>
          )}
          {data.type_of_leave === "Mis Carriage" && (
            <>
              Ref :- 1. G.O. M.S.No. 295 Fin &Plag. Dt :13.8.1985{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Application of the individual along with the Medical Certificate.{"\n"}
            </>
          )}
          {data.type_of_leave === "Histerictomy" && (
            <>
              Ref :- 1. G.O. M.S.No. 52 Fin (FR.I) Dept. Dt :01.04.2011{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Application of the individual along with the Medical Certificate.{"\n"}
            </>
          )}
          {/* Fallback for other leave types */}
          {!["Meternity", "Peternity", "EOL", "Commutation", "Mis Carriage", "Histerictomy"].includes(data.type_of_leave) && (
            <>
              Ref:- 1. G.O.Ms.No.40, Edn, dt.07-05-2002{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. A.P. Leave Rules.{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Application and Documents produced by the individual.{"\n"}
            </>
          )}
        </Text>

        <Text style={styles.header}>**************</Text>

        <Text style={styles.additional}>
        
  {data.type_of_leave === "Meternity" && (
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      In the reference 1 to 4 cited and on the basis of the reference 5th cited, 
      180 days of maternity leave from {data.from_date} to{(' ')}{data.to_date}{(' ')} for{(' ')}{totalDays}{(' ')} 
      days has been sanctioned to  Smt{(' ')}{data.name},{(' ')}{data.designation},{(' ')}Z.P.H.S BH Kota, Mdl: Kotananduru, 
      as she has only 01/02 living children. The individual is eligible for full pay and 
      allowances during the period. If there is any false statement in the medical certificate 
      and the individual's application, the maternity leave salary will be recovered from the incumbent.
    </>
  )}

  {data.type_of_leave === "Peternity" && (
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       Adverting to the above subject & reference, Sri. {(' ')}{data.name},{(' ')}{data.designation}, 
       {(' ')}working under my control has submitted his proposals for sanction of Paternity leave. 
      As per the reference 3rd cited, in the Memo, it has been clarified that Paternity Leave 
      by married Male Govt Employees can be availed either before 15 days or within a period 
      of 6 months from the date of Delivery. Hence, as per the powers delegated to me 
      vide Ref. 1 and in view of orders issued in Ref. 2, Sri.{(' ')}{data.name},{(' ')}{data.designation},{(' ')} 
      is hereby sanctioned Paternity Leave with full pay w.e.f.{(' ')}{data.from_date}{(' ')}to {(' ')}{data.to_date}{(' ')} 
      for{(' ')}{totalDays}{(' ')}days under A.P.L.R 1933 on the basis of Medical Certificate.
    </>
  )}

  {data.type_of_leave === "EOL" && (
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      As per the references 1st to 3rd cited, Extra Ordinary Leave of{(' ')}{totalDays}{(' ')}days i.e. 
      from {data.from_date} to {data.to_date}{(' ')}{totalDays}{(' ')}days is sanctioned to 
      Sri./Smt/Kum {data.name},{(' ')}{data.designation},{(' ')} 
      Z.P.H.S BH Kota, as per the reference 5th cited on the grounds of {(' ')}{data.reason}{(' ')}reasons. 
      This extraordinary leave will be counted for the annual periodical increment and 
      6/12/18/24 years automatic advancement scheme, i.e., the increment and pay fixations 
      will be postponed for{(' ')}{totalDays}{(' ')}days. No pay and allowances will be paid for the above said period.
    </>
  )}

  {data.type_of_leave === "Commutation" && (
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      As per the provisions contained in the reference cited, the Gazetted Headmaster, 
      Z.P.H.S BH Kota, is pleased to sanction Half Pay Leave for{(' ')}{totalDays}{(' ')}days i.e. from{(' ')}{data.from_date}{(' ')} 
      to {(' ')}{data.to_date}{(' ')}, commuted to full pay on medical grounds to Sri./Smt/Kum{(' ')}{data.name}{(' ')}, 
      {data.designation}, Z.P.H.S BH Kota by debiting{(' ')}{data.leave_days}{(' ')}days from His/her Half Pay Leave Account. 
      After debiting the above Commuted Leave, the leave balance at the credit of the individual 
      is{(' ')}{data.leave_balance}{(' ')}days.
    </>
  )}

  {data.type_of_leave === "Mis Carriage" && (
    <>
      In accordance with G.O. read above reference 1st cited, Sri./Smt/Kum {data.name}, 
      {data.designation}, Z.P.H.S BH Kota, Kotananduru, is hereby sanctioned Special Medical Leave 
      for Abortion for{(' ')}{totalDays}{(' ')}days from{(' ')}{data.from_date}{(' ')}to{(' ')}{data.to_date}{(' ')}(both days inclusive). 
      The individual is directed to join after the expiry of Special Medical Leave for abortion 
      now granted at the same school. Certified that she would have continued in the same post 
      but for going on leave now granted.
    </>
  )}

  {data.type_of_leave === "Histerictomy" && (
    <>In accordance with G.O. read above reference 1st cited, Sri./Smt/Kum{(' ')}{data.name}{(' ')}, 
      {data.designation}, Z.P.H.S BH Kota, Kotananduru, is hereby sanctioned Special Medical Leave 
      for Hysterectomy operation for{(' ')}{totalDays}{(' ')}days from{(' ')}{data.from_date}{(' ')}to{(' ')}{data.to_date}{(' ')} 
      {'(both days inclusive)'}. The individual is directed to join after the expiry of 
      Special Medical Leave for Hysterectomy operation now granted at the same school. 
      Certified that she would have continued in the same post but for going on leave now granted.
    </>
  )}

  {/* Fallback for other leave types */}
  {!["Meternity", "Peternity", "EOL", "Commutation", "Mis Carriage", "Histerictomy"].includes(data.type_of_leave) && (
    <>
      As per the provisions contained in the reference cited, the Headmaster, 
      Z.P.H.S BH Kota, Kotananduru Mandal, is pleased to sanction{(' ')}{data.type_of_leave}{(' ')}for 
      {(' ')}{totalDays}{(' ')}days, i.e., from{(' ')}{data.from_date}{(' ')}to{(' ')}{data.to_date}{(' ')}of{(' ')}{data.name},{(' ')} 
      {(' ')}{data.designation}, Z.P.H.S BH Kota, by debiting {data.leave_days} days from the individual's 
      {(' ')}{data.type_of_leave}{(' ')}Leave Account. After debiting, the {data.type_of_leave} leave balance of 
      the individual is shown below.
    </>
  )}
</Text>


        <Text style={[styles.additional, styles.underline]}>
          Annexure
        </Text>

        {/* Table with headers and data */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Name</Text>
            <Text style={styles.tableCellHeader}>Designation</Text>
            <Text style={styles.tableCellHeader}>From Date</Text>
            <Text style={styles.tableCellHeader}>To Date</Text>
            <Text style={styles.tableCellHeader}>Leave Type</Text>
            <Text style={styles.tableCellHeader}>Leave Available</Text>
            <Text style={styles.tableCellHeader}>Leave Availed</Text>
            <Text style={[styles.tableCellHeader, styles.lastTableCell]}>Leave Balance</Text>
          </View>

          {/* Table Data */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{data.name}</Text>
            <Text style={styles.tableCell}>{data.designation}</Text>
            <Text style={styles.tableCell}>{data.from_date}</Text>
            <Text style={styles.tableCell}>{data.to_date}</Text>
            <Text style={styles.tableCell}>{data.type_of_leave}</Text>
            <Text style={styles.tableCell}>{data.leave_available}</Text>
            <Text style={styles.tableCell}>{data.leave_days}</Text>
            <Text style={[styles.tableCell, styles.lastTableCell]}>{data.leave_balance}</Text>
          </View>
        </View>

        {/* Additional text below the table */}
        <Text style={styles.additional}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {data.add_text}{"\n"}
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
        </Text>

        <Text style={styles.copy}>
          2. Stock file.
        </Text>

        <Text style={styles.copy}>
          3. The STO.
        </Text>
      </Page>
    </Document>
  );
};

export default LeaveDoc;
