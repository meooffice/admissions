import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    // Outer container for all sections with double border
    container: {
        padding: 15,
        border: '3px solid black', // Outer border
        borderRadius: 10,
        marginBottom: 15,
    },
    // Single division style for all sections
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
        /*backgroundColor: '#f0f0f0',*/
        padding: 4,
        marginBottom: 8,
        borderBottom: '1px solid black',
        borderTop: '1px solid black',
        textAlign: 'center',
    },
    headerSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', // Logos at both ends
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
        fontSize: 16,
        textAlign: 'justify',
        marginVertical: 10,
        
    },
    underline: {
        textDecoration: 'underline',
    },
});

// Define the StudentPDF component
const StudentPDF = ({ record }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Outer container with double line border */}
            <View style={styles.container}>
                {/* 1st Division: Logo and School Name */}
                <View style={styles.headerSection}>
                    <Image style={styles.logo} src="https://i.postimg.cc/2ygF6cCy/SRK.png" />
                    <View style={styles.textContainer}>
                        <Text style={styles.title1}>Z P P HIGH SCHOOL- P KOTTAM</Text>
                        <Text style={styles.title2}>KOTANANDURU MANDAL, KAKINADA, 533407</Text>
                    </View>
                    <Image style={styles.logo} src="https://i.postimg.cc/2ygF6cCy/SRK.png" />
                </View>

                {/* 2nd Division: Admission Details */}
                <View style={styles.section}>
                    <Text style={styles.legendLabel}>STUDY CERTIFICATE</Text>
                    <View style={styles.fieldRow}>
                        <View style={styles.fieldLeft}>
                            <Text style={styles.value}>Date of Joining: {record.doj}</Text>
                        </View>
                        <View style={styles.fieldCenter}>
                           
                        </View>
                        <View style={styles.fieldRight}>
                            <Text style={styles.value}>Admission No: {record.adm_no}</Text>
                        </View>
                    </View>
                </View>

                {/* 3rd Division: Study Certificate Details */}
                <Text style={styles.declaration}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    This is to certify that{' '}{record.gender === 'Boy' ? 'Mr.' : 'Miss.'}{' '}
                    <Text style={styles.underline}>{record.sur_name} {record.name}</Text>, 
                    Son / Daughter of Sri{' '}
                    <Text style={styles.underline}>{record.father_name}</Text> and Smt{' '}
                    <Text style={styles.underline}>{record.mother_name}</Text>, has studied in this institution 
                    from class <Text style={styles.underline}>{record.form_class}</Text> to class{' '}
                    <Text style={styles.underline}>{record.to_class}</Text> during the academic years from{' '}
                    <Text style={styles.underline}>{record.form_year}</Text> to{' '}
                    <Text style={styles.underline}>{record.to_year}</Text>, with admission number{' '}
                    <Text style={styles.underline}>{record.adm_no}</Text> as per our school records.
                </Text>



                    <View style={styles.fieldRow}>
                        <View style={styles.fieldLeft}>
                            <Text style={styles.values}>Place: ___________</Text>
                        </View>
                        <View style={styles.fieldCenter}>
                           
                        </View>
                        <View style={styles.fieldRight}>
                            <Text style={styles.values}>Signature of HM </Text>
                        </View>
                    </View>
                    <View style={styles.fieldRow}>
                        <View style={styles.fieldLeft}>
                            <Text style={styles.valu}>Date: ___________</Text>
                        </View>
                        <View style={styles.fieldCenter}>
                           
                        </View>
                        <View style={styles.fieldRight}>
                            <Text style={styles.values}></Text>
                        </View>
                    </View>
                </View>

           
        </Page>
    </Document>
);

export default StudentPDF;
