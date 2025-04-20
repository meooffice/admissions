import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Utility function for converting numbers to words
const numberToWords = (num) => {
    const belowTwenty = [
        'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
        'Eighteen', 'Nineteen'
    ];
    const tens = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    if (num < 20) return belowTwenty[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + belowTwenty[num % 10] : '');
    if (num < 1000) return belowTwenty[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + numberToWords(num % 100) : '');
    if (num < 1000000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '');

    return '';
};

// Function to format the DOB to text
const formatDOBToText = (dob) => {
    if (!dob) return 'Invalid Date';
    const [day, month, year] = dob.split('-').map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year) || month < 1 || month > 12 || day < 1 || day > 31) {
        return 'Invalid Date';
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayText = numberToWords(day);
    const monthText = months[month - 1];
    const yearText = numberToWords(year);

    return `${dayText} ${monthText}, ${yearText}`;
};

// Styles for the PDF
const styles = StyleSheet.create({
    page: { padding: 30 },
    container: { padding: 15, border: '3px solid black', borderRadius: 10, marginBottom: 15 },
    section: { marginBottom: 10, padding: 10 },
    fieldRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, fontSize: 14 },
    fieldLeft: { width: '40%', textAlign: 'left', fontSize: 14 },
    fieldCenter: { width: '20%', textAlign: 'center', fontSize: 14 },
    fieldRight: { width: '40%', textAlign: 'right', fontSize: 14 },
    value: { fontSize: 12, marginBottom: 10, marginTop: 15 },
    legendLabel: { fontSize: 18, fontWeight: 'bold', padding: 4, marginBottom: 8, borderBottom: '1px solid black', borderTop: '1px solid black', textAlign: 'center' },
    headerSection: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 10, borderRadius: 10, marginBottom: 0 },
    logo: { width: 50, height: 50 },
    title1: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
    title2: { fontSize: 14, textAlign: 'center' },
    declaration: { marginTop: 10, fontSize: 16, textAlign: 'justify', marginVertical: 10, },
    underline: { textDecoration: 'underline', },
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

});

// Define the StudentPDF component
const DobPdf = ({ record }) => {
    // Validate the record and necessary fields
    if (!record || !record.dob || !record.name || !record.sur_name || !record.adm_no) {
        return <Text style={{ color: 'red' }}>Error: Missing required record data.</Text>;
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <View style={styles.headerSection}>
                        <Image style={styles.logo} src="https://i.postimg.cc/2ygF6cCy/SRK.png" />
                        <View style={styles.textContainer}>
                            <Text style={styles.title1}>Z P P HIGH SCHOOL- P KOTTAM</Text>
                            <Text style={styles.title2}>KOTANANDURU MANDAL, KAKINADA, 533407</Text>
                        </View>
                        <Image style={styles.logo} src="https://i.postimg.cc/2ygF6cCy/SRK.png" />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.legendLabel}>DATE OF BIRTH CERTIFICATE</Text>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldLeft}>
                                <Text style={styles.value}>Date of Joining: {record.doj || 'N/A'}</Text>
                            </View>
                            <View style={styles.fieldCenter}>
                                <Text style={styles.value}>PEN: {record.pen_no || 'N/A'}</Text>
                            </View>
                            <View style={styles.fieldRight}>
                                <Text style={styles.value}>Admission No: {record.adm_no}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.declaration}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        This is to certify that {' '}{record.gender === 'Boy' ? 'Mr.' : 'Miss.'}{' '}
                        <Text style={styles.underline}>{record.sur_name || 'N/A'} {record.name || 'N/A'}</Text>,
                        Son / Daughter of Sri{' '}
                        <Text style={styles.underline}>{record.father_name || 'N/A'}</Text> and Smt{' '}
                        <Text style={styles.underline}>{record.mother_name || 'N/A'}</Text>, has studied in this institution
                        from class <Text style={styles.underline}>{record.form_class || 'N/A'}</Text> to class{' '}
                        <Text style={styles.underline}>{record.to_class || 'N/A'}</Text> during the academic years from{' '}
                        <Text style={styles.underline}>{record.form_year || 'N/A'}</Text> to{' '}
                        <Text style={styles.underline}>{record.to_year || 'N/A'}</Text>, with admission number{' '}
                        <Text style={styles.underline}>{record.adm_no || 'N/A'}</Text>. {' '}{record.gender === 'Boy' ? 'His' : 'Her'} Date of Birth is{' '}
                        <Text style={styles.underline}>{record.dob || 'N/A'}</Text> in words{' '}
                        <Text style={styles.underline}>({formatDOBToText(record.dob)})</Text>.
                    </Text>


                    <View style={styles.fieldRow}>
                        <View style={styles.fieldLeft}>
                            <Text style={styles.value}>Place: ___________</Text>
                        </View>
                        <View style={styles.fieldRight}>
                            <Text style={styles.value}>Signature of HM </Text>
                        </View>
                    </View>
                    <View style={styles.fieldRow}>
                        <View style={styles.fieldLeft}>
                            <Text style={styles.value}>Date: ___________</Text>
                        </View>
                        <View style={styles.fieldRight}>
                            <Text style={styles.value}></Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default DobPdf;
