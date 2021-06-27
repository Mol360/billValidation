const express = require('express');
const BarcodeValidation = require('./Barcode/BarcodeValidation');
const app = express();

app.get('/boleto/:barcode', (req, res) => {
	var barcode = req.params.barcode;
	var barcode = "21290001192110001210904475617405975870000002000"; // billFormat
	//var barcode = "817700000000010936599702411310797039001433708318"; // affiliateFormat

	var result = {};
	var responseCode = 200;

	try {
		var barcodeValidation = new BarcodeValidation(barcode);
		barcodeValidation.validate();
		result = {
			barCode: barcodeValidation.getConvertedBarcode(),
			amount: barcodeValidation.getAmount(),
			expirationDate: barcodeValidation.getExpirationDate()
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