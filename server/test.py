from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import inch

# Define output path
output_path = "/mnt/data/Formatted_Postal_Ballot_Notice_ReportLab.pdf"

# Create document
doc = SimpleDocTemplate(output_path, pagesize=A4,
                        rightMargin=72, leftMargin=72,
                        topMargin=72, bottomMargin=72)

# Get sample styles and create custom styles
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleCenter', parent=styles['Title'], alignment=TA_CENTER, fontSize=14, spaceAfter=20))

# Build PDF elements
elements = []

# Title
elements.append(Paragraph("MACROTECH DEVELOPERS LIMITED", styles['TitleCenter']))
elements.append(Spacer(1, 0.2 * inch))

# Body text
for para in paragraphs:
    elements.append(Paragraph(para.replace('\n', '<br />'), styles['Normal']))
    elements.append(Spacer(1, 0.1 * inch))

# Build PDF
doc.build(elements)

output_path
