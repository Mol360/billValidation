const express = require('express');
const BarcodeValidation = require('./Barcode/BarcodeValidation');
const app = express();

app.get('/boleto/:barcode', (req, res) => {
	var barcode = req.params.barcode;
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