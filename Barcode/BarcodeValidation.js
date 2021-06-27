const AffiliateFormat = require('./AffiliateFormat');
const BillFormat = require('./BillFormat');

class BarcodeValidation {
    strBarcode = "";
    currentBarcodeLength = 0;
    barcodeFormat;

    constructor(strBarcode) {
        this.strBarcode = strBarcode;
        this.currentBarcodeLength = strBarcode.length;

        if(this.currentBarcodeLength == BillFormat.barcodeLength) {
            this.barcodeFormat = new BillFormat(this.strBarcode);
        } else if(this.currentBarcodeLength == AffiliateFormat.barcodeLength) {
            this.barcodeFormat = new AffiliateFormat(this.strBarcode);
        } else {
            throw "Barcode format undefined.";
        }
    };

    getConvertedBarcode() {
        return this.barcodeFormat.getConvertedBarcode();
    };

    getAmount() {
        return this.barcodeFormat.getFormattedAmount();
    };

    getExpirationDate() {
        return this.barcodeFormat.getFormattedExpirationDate();
    };

    getBarcode() {
        return this.strBarcode;
    };

    isBarcodeFirstBlockValid() {
        return this.isValidTenModule(this.barcodeFormat.getValidationBarcodeFirstBlock(), this.barcodeFormat.getBarcodeFirstBlockDigit());
    };

    isBarcodeSecondBlockValid() {
        return this.isValidTenModule(this.barcodeFormat.getValidationBarcodeSecondBlock(), this.barcodeFormat.getBarcodeSecondBlockDigit());
    };

    isBarcodeThirdBlockValid() {
        return this.isValidTenModule(this.barcodeFormat.getValidationBarcodeThirdBlock(), this.barcodeFormat.getBarcodeThirdBlockDigit());
    };

    isBarcodeFourthBlockValid() {
        return this.isValidTenModule(this.barcodeFormat.getValidationBarcodeFourthBlock(), this.barcodeFormat.getBarcodeFourthBlockDigit());
    };

    validateBarcodeBlocks() {
        var errorMessage = "Barcode verification digit is not valid for ";
        if(!this.isBarcodeFirstBlockValid()) {
            throw errorMessage + "first block : " + this.barcodeFormat.getValidationBarcodeFirstBlock() + " - " + this.barcodeFormat.getBarcodeFirstBlockDigit();
        } else if(!this.isBarcodeSecondBlockValid()) {
            throw errorMessage + "second block : " + this.barcodeFormat.getValidationBarcodeSecondBlock() + " - " + this.barcodeFormat.getBarcodeSecondBlockDigit();
        } else if(!this.isBarcodeThirdBlockValid()) {
            throw errorMessage + "third block : " + this.barcodeFormat.getValidationBarcodeThirdBlock() + " - " + this.barcodeFormat.getBarcodeThirdBlockDigit();
        } else if(!this.isBarcodeFourthBlockValid()) {
            throw errorMessage + "fourth block : " + this.barcodeFormat.getValidationBarcodeFourthBlock() + " - " + this.barcodeFormat.getBarcodeFourthBlockDigit();
        }
    };

    validateBarcode() {
        if(!this.isValidBarcode()) {
            throw "Barcode verification digit is not valid : " + this.barcodeFormat.getValidationBarcode() + " - " + this.barcodeFormat.getBarcodeDigitCode();
        }
    };
    isValidBarcode() {
        return this.isValidElevenModule(this.barcodeFormat.getValidationBarcode(), this.barcodeFormat.getBarcodeDigitCode());
    };

    validate() {
        this.validateBarcodeBlocks();
        this.validateBarcode();
    };

    isValidTenModule(strCodeValidation, verificationCode) {
        var isValid = false;
        if(parseInt(verificationCode) == this.getTenModuleVerificationCode(strCodeValidation)) {
            isValid = true;
        }
        return isValid;
    };

    isValidElevenModule(strCodeValidation, verificationCode) {
        var isValid = false;
        if(parseInt(verificationCode) == this.getElevenModuleVerificationCode(strCodeValidation)) {
            isValid = true;
        }
        return isValid;
    };

    getTenModuleVerificationCode(strCodeValidation) {
        var resultSum = 0;
        var multiplier = 2;
        var verificationCode = 0;

        for(var i = strCodeValidation.length; i > 0; i--) {
            var tmpSum = (multiplier * parseInt(strCodeValidation[i - 1])).toString();
            multiplier = (multiplier == 1) ? 2 : 1;
            for(var b = 0; b < tmpSum.length; b++) {
                resultSum += parseInt(tmpSum[b]);
            }
        }

        var sumModule = resultSum % 10;
        if(sumModule > 0) {
            verificationCode = 10 - sumModule;
        }

        return verificationCode;
    };

    getElevenModuleVerificationCode(strCodeValidation) {
        var resultSum = 0;
        var multiplier = 2;
        var verificationCode = 0;

        for(var i = strCodeValidation.length; i > 0; i--) {
            var tmpSum = (multiplier * parseInt(strCodeValidation[i - 1])).toString();
            multiplier ++;
            if(multiplier > 9) {
                multiplier = 2;
            }
            resultSum += parseInt(tmpSum);
        }

        var sumModule = resultSum % 11;
        if(sumModule > 0) {
            verificationCode = 11 - sumModule;
            if(verificationCode == 0 || verificationCode == 10 || verificationCode == 11) {
                verificationCode = 1;
            }
        }

        return verificationCode;
    };

};

module.exports = BarcodeValidation;