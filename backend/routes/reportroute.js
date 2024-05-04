// const express = require('express');
// const router = express.Router();
// const { PDFDocument } = require('pdf-lib');
// const Supload = require('../models/supload');

// router.get('/generatePDF', async (req, res) => {
//   try {
//     const users = await Supload.distinct('urd');
//     console.log("users:", users);

//     const pdfDoc = await PDFDocument.create();
    
//     for (const urd of users) {
//       const userData = await Supload.aggregate([
//         { $match: { urd } },
//         { $group: { _id: '$domain', count: { $sum: 1 } } },
//       ]);

//       // Add content to the PDF document for each user
//       const page = pdfDoc.addPage();
//       const { height } = page.getSize();
//       page.drawText(`Dashboard Report - User ID: ${urd}`, { x: 50, y: height - 50, size: 18 });

//       let currentY = height - 80;

//       userData.forEach((item) => {
//         page.drawText(`Domain: ${item._id}`, { x: 50, y: currentY, size: 14 });
//         page.drawText(`Files Count: ${item.count} files`, { x: 70, y: currentY - 20, size: 14 });

//         currentY -= 40;
//       });

//       const totalFilesCount = userData.reduce((total, item) => total + item.count, 0);
//       page.drawText(`Total Files Count: ${totalFilesCount} files`, { x: 50, y: currentY, size: 14 });

//       page.moveDown();
//     }

//     const pdfBytes = await pdfDoc.save();

//     // Set response headers
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename=dashboard_report.pdf');

//     // Send the PDF as a response
//     res.send(pdfBytes);
//   } catch (error) {
//     console.error('Error during PDF generation:', error);
//     res.status(500).json({ error: 'Error during PDF generation' });
//   }
// });

// module.exports = router;

// reportroute.js (Backend)
const express = require('express');
const router = express.Router();
const Supload = require('../models/supload');

router.get('/generatePDFData', async (req, res) => {
  try {
    const users = await Supload.distinct('urd');
    console.log("users:", users);

    const pdfData = [];

    for (const urd of users) {
      const userData = await Supload.aggregate([
        { $match: { urd } },
        { $group: { _id: '$domain', count: { $sum: 1 } } },
      ]);

      const userContent = {
        userId: urd,
        domains: userData.map(item => ({ domain: item._id, filesCount: item.count })),
        totalFilesCount: userData.reduce((total, item) => total + item.count, 0),
      };

      pdfData.push(userContent);
      console.log("usercontent:",userContent);
    }

    res.json({ pdfData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;
