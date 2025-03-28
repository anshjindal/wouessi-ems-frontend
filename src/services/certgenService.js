import { jsPDF } from "jspdf";

export function generateCertificate({
  name = "Alice Brown",
  project = "EMS Development",
  mentor = "Jane Smith",
}) {
  // Create a landscape-oriented PDF
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Optional: Fancy border
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20); // outer border
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30); // inner border

  // Certificate Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text("Certificate of Completion", pageWidth / 2, 50, null, null, "center");

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text("This is to certify that", pageWidth / 2, 70, null, null, "center");

  // Student Name
  doc.setFont("times", "bolditalic");
  doc.setFontSize(24);
  doc.text(name, pageWidth / 2, 90, null, null, "center");

  // Recognition Text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("has successfully completed the capstone project", pageWidth / 2, 105, null, null, "center");

  // Project Title
  doc.setFont("times", "italic");
  doc.setFontSize(18);
  doc.text(`"${project}"`, pageWidth / 2, 120, null, null, "center");

  // Mentor Text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(`Under the mentorship of: ${mentor}`, pageWidth / 2, 135, null, null, "center");

  // Date and Signature
  const today = new Date().toLocaleDateString();
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Date: ${today}`, 30, pageHeight - 30);
  doc.text("_____________________", pageWidth - 70, pageHeight - 40);
  doc.text("Capstone Coordinator", pageWidth - 70, pageHeight - 30);

  // Save the file
  const fileName = `${name.replace(" ", "_")}_certificate.pdf`;
  doc.save(fileName);
}
