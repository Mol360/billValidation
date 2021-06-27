const express = require('express');
const AffiliateFormat = require('./Barcode/AffiliateFormat');
const BillFormat = require('./Barcode/BillFormat');
const BarcodeValidation = require('./Barcode/BarcodeValidation');
const app = express();

app.get('/boleto/:barcode', (req, res) => {
	var barcode = req.params.barcode;
	var barcode = "21290001192110001210904475617405975870000002000"; // billFormat
	//var barcode = "817700000000010936599702411310797039001433708318"; // affiliateFormat

	var billFormat = new BillFormat();
	var affiliateFormat = new AffiliateFormat();

	var result = {};
	var responseCode = 200;

	try {
		var barcodeValidation = new BarcodeValidation(barcode);
		result = {
			barCode: barcodeValidation.getBarcode(),
			amount: billFormat.getText(),
			expirationDate: affiliateFormat.getText()
		};
	} catch (e) {
		responseCode = 400;
		result = {
			status: 'error',
			message: e
		};
	}

	res.send(result, responseCode);
});

module.exports = app;