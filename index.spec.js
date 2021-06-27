const BarcodeValidation = require('./Barcode/BarcodeValidation');


describe('Module Calcule Validation', () => {
	it('A valid ten module calculation', () => {
		const barcode = "21290001192110001210904475617405975870000002000";
		var isValid = true;
		const validStr = "0447561740";
		const validDigitVerification = "5";
		var barcodeBillFormatValidation;

		try {
			barcodeBillFormatValidation = new BarcodeValidation(barcode);
		} catch (e) {
			//
		}

		isValid = barcodeBillFormatValidation.isValidTenModule(validStr, validDigitVerification);

		expect(isValid).toBe(true);
	});

	it('A valid eleven module calculation', () => {
		const barcode = "21290001192110001210904475617405975870000002000";
		var isValid = true;
		const validStr = "2129758700000020000001121100012100447561740";
		const validDigitVerification = "9";
		var barcodeBillFormatValidation;

		try {
			barcodeBillFormatValidation = new BarcodeValidation(barcode);
		} catch (e) {
			//
		}

		isValid = barcodeBillFormatValidation.isValidElevenModule(validStr, validDigitVerification);

		expect(isValid).toBe(true);
	});
});

describe('Bill Format Test', () => {
	const validBillFormatBarcode = "21290001192110001210904475617405975870000002000";
	var barcodeBillFormatValidation;

	it('A valid BillFormat barcode format', () => {
		var isValid = true;

		try {
			barcodeBillFormatValidation = new BarcodeValidation(validBillFormatBarcode);
		} catch (e) {
			isValid = false;
			console.log("Error : " + e);
		}

		expect(isValid).toBe(true);
	});

	it('A valid BillFormat second block with verification digit', () => {
		var isValid = barcodeBillFormatValidation.isBarcodeSecondBlockValid();
		expect(isValid).toBe(true);
	});

	it('A valid BillFormat third block with verification digit', () => {
		var isValid = barcodeBillFormatValidation.isBarcodeThirdBlockValid();
		expect(isValid).toBe(true);
	});

	it('A valid BillFormat fourth block with verification digit', () => {
		var isValid = barcodeBillFormatValidation.isBarcodeFourthBlockValid();
		expect(isValid).toBe(true);
	});

	it('A valid BillFormat complete barcode with verification digit', () => {
		var isValid = barcodeBillFormatValidation.isValidBarcode();
		expect(isValid).toBe(true);
	});
});