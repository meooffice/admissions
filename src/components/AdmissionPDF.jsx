import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    section: {
        marginBottom: 10,
        padding: 10,
        border: '1px solid black',
        borderRadius: 10,
    },
    fieldRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', // Align fields in a row
        marginBottom: 5,
    },
    field: {
        width: '30%', // Three fields take 30% width each, to leave space for the gap
    },
    legendLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0', // Give it a light background like a legend
        padding: 4,
        marginBottom: 8,
        borderBottom: '1px solid black',
    },
    value: {
        fontSize: 10,
        marginBottom: 3,
    },
    headerSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', // Logos at both ends
        alignItems: 'center', // Vertically center everything
        backgroundColor: '#f0f0f0', // Grey background
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    logo: {
        width: 50,
        height: 50,
    },
    textContainer: {
        flex: 1, // Take up remaining space between logos
        display: 'flex',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
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
        fontSize: 12,
        textAlign: 'justify',
    },
    signatureSection: {
        marginTop: 10,
        fontSize: 12,
    },
});

// Create PDF Document
const AdmissionPDF = ({ formData }) => (
    <Document>
        <Page style={styles.page}>
            {/* 1st Division: Logo and School Name */}
            <View style={styles.headerSection}>
                <Image style={styles.logo} src="https://i.postimg.cc/2ygF6cCy/SRK.png" />
                <View style={styles.textContainer}>
                    <Text style={styles.title1}>Z P P HIGH SCHOOL- P KOTTAM</Text>
                    <Text style={styles.title2}>ADMISSION FORM</Text>
                </View>
                <Image style={styles.logo} src="https://i.postimg.cc/2ygF6cCy/SRK.png" />
            </View>       

            {/* 2nd Division: Form Data */}
            <View style={styles.section}>
                <Text style={styles.legendLabel}>Admission Details</Text>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Date of Joining: {formData.doj}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Joining Class: {formData.join_class}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Admission No: __________</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.legendLabel}>Student Details</Text>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>PEN Number: {formData.pen_no}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Sur Name: {formData.sur_name}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Name: {formData.name}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Date of Birth: {formData.dob}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Gender: {formData.gender}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Mother Tongue: {formData.mother_lang}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Student Aadhaar No: {formData.st_adhar}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Caste: {formData.caste}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Category: {formData.catogory}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Nationality & Religion: {formData.nation_religion}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Height(cm): {formData.hieght}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Shoe Size(cm): {formData.shoe_size_cm}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Moles: {formData.moles}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Father's Name: {formData.father_name}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Father's Aadhaar: {formData.f_adhar}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Mother's Name: {formData.mother_name}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Mother's Aadhaar: {formData.m_adhar}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Occupation: {formData.ocupation}</Text>
                    </View>
                </View>                
            </View>

            <View style={styles.section}>
                <Text style={styles.legendLabel}>Address Details</Text>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Bank Account Number: {formData.bannk_ac_no}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>IFSC Code: {formData.ifsc_code}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Bank Name: {formData.bannk_name}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Address: {formData.address}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Ration Card Number: {formData.ration_card_no}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Mobile Number: {formData.mobile_no}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Guardian: {formData.guardian}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>TV Type: {formData.tv_type}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>TV Connection: {formData.tv_connection}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>DTH Provider: {formData.dth_name}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Mobile Type: {formData.mobile_type}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Computer: {formData.computer}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Internet Availability: {formData.internet}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.legendLabel}>Previous School Details</Text>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>RC/TC No: {formData.rc_tc_no}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Issue Date: {formData.issue_date}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Last Class: {formData.last_class}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Last School: {formData.last_school}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Last School Address: {formData.last_school_add}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Qualified: {formData.qualified}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Medium: {formData.medium}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Who is Joining: {formData.who_is_joinig}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Relation: {formData.relation}</Text>
                    </View>
                </View>
                <View style={styles.fieldRow}>
                    <View style={styles.field}>
                        <Text style={styles.value}>Present Address: {formData.present_add}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Distance to School: {formData.distance_to_school}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.value}>Mode of Transport: {formData.mode_transport}</Text>
                    </View>
                </View>                
            </View>

            {/* 3rd Division: Declaration and Signature */}
            <Text style={styles.declaration}>
                I, {formData.who_is_joinig}, {formData.relation}, of,{formData.sur_name}, {formData.name}, hereby declare that the information provided above is true and accurate to the best of my knowledge. I understand that any false information may result in the cancellation of my admission.
            </Text>
            <Text style={[styles.value, { textAlign: 'right', marginRight: 40 }]}>
                    Signature of Guardian: 
                </Text>
                <Text style={[styles.value, { textAlign: 'right', marginTop: 40,marginRight: 40 }]}>
                Admitted in Class: ______, Adm No: _______ Date: {new Date().toLocaleDateString()}, Signature of The HM
                </Text>
        </Page>
    </Document>
);

export default AdmissionPDF;
