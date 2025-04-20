import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

/**
 * Generates a PDF file from student data and custom columns.
 *
 * @param {Array} columnHeaders - Custom extra columns for the table
 * @param {Array} students - Array of student data
 * @param {string} orientation - 'portrait' or 'landscape'
 * @param {string} paperSize - 'a4', 'letter', 'legal'
 * @param {Object} options - Optional config: { className, registerName, fileName, includeDateOfJoining, includeGender, includeDOB, includeCaste }
 */
export const generatePDF = (
  columnHeaders = [],
  students = [],
  orientation = "portrait",
  paperSize = "a4",
  options = {}
) => {
  const {
    className = "",
    registerName = "",
    fileName = "student_details.pdf",
    includeDateOfJoining = false,
    includeGender = false,
    includeDOB = false,
    includeCaste = false,
  } = options;

  const doc = new jsPDF(orientation, "mm", paperSize);

  if (!Array.isArray(students) || students.length === 0) {
    doc.setFontSize(12);
    doc.text("No student data available.", 20, 20);
    doc.save(fileName);
    return;
  }

  // Title
  const titleText = className ? `${className} - Student Details` : "Student Details";
  doc.setFontSize(16);
  doc.text(titleText, doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });

  if (registerName) {
    doc.setFontSize(12);
    doc.text(`Register Name: ${registerName}`, doc.internal.pageSize.getWidth() / 2, 23, {
      align: "center"
    });
  }

  // Build header row
  const headers = ["Admission No", "Name"];

  if (includeDateOfJoining) headers.push("Date of Joining");
  if (includeGender) headers.push("Gender");
  if (includeDOB) headers.push("Date of Birth");
  if (includeCaste) headers.push("Caste");

  headers.push(...columnHeaders.map((header, i) => header || `${i + 1}`));

  // Build body data
  const body = students.map((student) => {
    const row = [
      student.adm_no,
      `${student.sur_name} ${student.name}`,
    ];

    if (includeDateOfJoining) row.push(student.doj || "");
    if (includeGender) row.push(student.gender || "");
    if (includeDOB) row.push(student.dob || "");
    if (includeCaste) row.push(student.category || "");

    row.push(...new Array(columnHeaders.length).fill("")); // Extra cols are empty for now

    return row;
  });

  // Define column styles
  const columnStyles = {
    0: { cellWidth: 18 }, // Admission No ~5-digit
    1: { cellWidth: 60 }, // Name, wrap up to ~25 chars
  };

  let colIndex = 2;

  if (includeDateOfJoining) columnStyles[colIndex++] = { cellWidth: 28 };
  if (includeGender) columnStyles[colIndex++] = { cellWidth: 16 };
  if (includeDOB) columnStyles[colIndex++] = { cellWidth: 28 };
  if (includeCaste) columnStyles[colIndex++] = { cellWidth: 20 };

  // Extra columns: auto-adjust width
  for (let i = 0; i < columnHeaders.length; i++) {
    columnStyles[colIndex++] = {}; // Let them auto fit
  }

  const startY = registerName ? 30 : className ? 27 : 25;

  autoTable(doc, {
    head: [headers],
    body,
    startY,
    theme: "grid",
    margin: { top: 10, left: 10, right: 10, bottom: 10 },
    styles: {
      fontSize: 8,
      cellPadding: 3,
      halign: "center",
      valign: "middle",
    },
    headStyles: {
      fillColor: [220, 220, 220], // Light grey
      textColor: 0,               // Black text
      fontSize: 9,
      halign: "center",
    
    },
    columnStyles,
    didParseCell: (data) => {
      // Optional: force text wrap for name column
      if (data.column.index === 1 && data.cell.raw) {
        data.cell.styles.cellWidth = 60;
      }
    },
  });

  doc.save(fileName);
};
