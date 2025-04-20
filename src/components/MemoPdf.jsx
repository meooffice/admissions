import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    container: {
        padding: 15,
        border: '3px solid black',
        borderRadius: 10,
        marginBottom: 15,
    },
    section: {
        marginBottom: 10,
        padding: 10,
    },
    fieldRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        fontSize: 14,
    },
    fieldLeft: {
        width: '45%',
        textAlign: 'left',
        fontSize: 14,
    },
    fieldCenter: {
        width: '10%',
        textAlign: 'center',
        fontSize: 14,
    },
    fieldRight: {
        width: '45%',
        textAlign: 'right',
        fontSize: 14,
    },
    value: {
        fontSize: 12,
        marginBottom: 10,
        marginTop: 5,
    },
    values: {
        fontSize: 12,
        marginBottom: 10,
        marginTop: 20,
        marginRight: 20,
    },
    valu: {
        fontSize: 12,
        marginBottom: 10,
    },
    legendLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 4,
        marginBottom: 8,
        borderBottom: '1px solid black',
        borderTop: '1px solid black',
        textAlign: 'center',
    },
    headerSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 0,
    },
    logo: {
        width: 50,
        height: 50,
    },
    textContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title1: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title2: {
        fontSize: 14,
        textAlign: 'center',
    },
    declaration: {
        marginTop: 10,
        fontSize: 14,
        textAlign: 'justify',
    },
    underline: {
        textDecoration: 'underline',
    },
    tableWrapper: {
        border: '2px solid black', // Thick outer border
        marginTop: 10,
        marginBottom: 10,
    },

    // Table header row
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        padding: 5,
        borderBottom: '1px solid black',
        borderTop: '1px solid black', // Optional bottom line under header
    },

    // Each row
    tableRow: {
        flexDirection: 'row',
        padding: 5,
        borderTop: '0.5px solid #999', // Thin top border
        borderBottom:'0.5px solid #999',
    },

    // Header cell styling
    tableHeaderCell: {
        fontSize: 9,
        fontWeight: 'bold',
        width: `${100 / 12}%`,
        textAlign: 'center',
        borderRight: '0.5px solid #999', // Thin right border
        borderLeft: '0.5px solid #999', // Thin right border
        padding: 2,
    },

    // Normal cell styling
    tableCell: {
        fontSize: 9,
        width: `${100 / 12}%`,
        textAlign: 'center',
        borderRight: '0.5px solid #999', // Thin right border
        borderLeft: '0.5px solid #999', // Thin right border
        padding: 2,
    },
});

// Component
const ConductPDF = ({ record, marks }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.headerSection}>
                    <Image style={styles.logo} src="https://i.postimg.cc/2ygF6cCy/SRK.png" />
                    <View style={styles.textContainer}>
                        <Text style={styles.title1}>Z P P HIGH SCHOOL- P KOTTAM</Text>
                        <Text style={styles.title2}>KORANANDURU MANDAL, KAKINADA, 533407</Text>
                    </View>
                    <Image style={styles.logo} src="https://i.postimg.cc/2ygF6cCy/SRK.png" />
                </View>

                {/* Certificate Heading */}
                <Text style={styles.legendLabel}>MARKS MEMO</Text>

                {/* Admission Info */}
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLeft}>Date of Joining: {record.doj}</Text>
                    <Text style={styles.fieldRight}>Admission No: {record.adm_no}</Text>
                </View>

                {/* Declaration */}
                <Text style={styles.declaration}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    This is to certify that {record.gender === 'Boy' ? 'Mr.' : 'Miss.'}{' '}
                    <Text style={styles.underline}>{record.sur_name} {record.name}</Text>,
                    Son / Daughter of Sri <Text style={styles.underline}>{record.father_name}</Text> and Smt{' '}
                    <Text style={styles.underline}>{record.mother_name}</Text>, has studied in this institution
                    from class <Text style={styles.underline}>{record.form_class}</Text> to class{' '}
                    <Text style={styles.underline}>{record.to_class}</Text> during the academic years from{' '}
                    <Text style={styles.underline}>{record.form_year}</Text> to{' '}
                    <Text style={styles.underline}>{record.to_year}</Text>, with admission number{' '}
                    <Text style={styles.underline}>{record.adm_no}</Text>.
                    And {record.gender === 'Boy' ? 'His' : 'Her'} Acadamic performance is as below, <Text style={styles.underline}></Text>.
                </Text>

                {/* Table Heading */}
                <Text style={[styles.legendLabel, { marginTop: 20 }]}>Academic Record</Text>

                {/* Table */}
                <View style={styles.section}>
                    <View style={styles.tableHeader}>
                        {[
                            'Year', 'Class', '1st Lang', '2nd Lang', '3rd Lang',
                            'Math', 'P/G Sci', 'B Sci', 'Social', 'Total', 'Percent', 'Result'
                        ].map((col, idx) => (
                            <Text key={idx} style={styles.tableHeaderCell}>{col}</Text>
                        ))}
                    </View>

                    {marks && marks.map((mark, idx) => (
                        <View key={idx} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{mark.academicYear}</Text>
                            <Text style={styles.tableCell}>{mark.class}</Text>
                            <Text style={styles.tableCell}>{mark.firstLanguage}</Text>
                            <Text style={styles.tableCell}>{mark.secondLanguage}</Text>
                            <Text style={styles.tableCell}>{mark.thirdLanguage}</Text>
                            <Text style={styles.tableCell}>{mark.math}</Text>
                            <Text style={styles.tableCell}>{mark.pScience}</Text>
                            <Text style={styles.tableCell}>{mark.bScience}</Text>
                            <Text style={styles.tableCell}>{mark.social}</Text>
                            <Text style={styles.tableCell}>{mark.total}</Text>
                            <Text style={styles.tableCell}>{mark.percentage}</Text>
                            <Text style={styles.tableCell}>{mark.result}</Text>
                        </View>
                    ))}
                </View>

                {/* Footer */}
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLeft}>Place: ___________</Text>
                    <Text style={styles.fieldRight}>Signature of HM</Text>
                </View>
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLeft}>Date: ___________</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default ConductPDF;
