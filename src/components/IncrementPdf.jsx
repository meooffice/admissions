import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 10,
        fontFamily: 'Helvetica',
        fontSize: 12,
    },
    section: {
        marginBottom: 10,
    },
});

const IncrementPDF = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Proceeding No: {data.proceeding_no}</Text>
                <Text>Date: {data.date}</Text>
                <Text>Name: {data.name}</Text>
                <Text>Designation: {data.designation}</Text>
                <Text>Present Pay: {data.present_pay}</Text>
                <Text>Rate of Increment: {data.rate_increment}</Text>
                <Text>DDO Name: {data.ddo_name}</Text>
            </View>
        </Page>
    </Document>
);

export default IncrementPDF;
