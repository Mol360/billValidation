const AffiliateFormat = require('./AffiliateFormat');
const BillFormat = require('./BillFormat');
const FormatBase = require('./FormatBase');

class BarcodeValidation {
    strBarcode = "";
    currentBarcodeLength = 0;
    barcodeFormat;

    constructor(strBarcode) {
        this.strBarcode = strBarcode;
        this.currentBarcodeLength = strBarcode.length;

        if(!isNaN(strBarcode)) {
            if(this.currentBarcodeLength == BillFormat.barcodeLength) {
                this.barcodeFormat = new BillFormat(this.strBarcode);
            } else if(this.currentBarcodeLength == AffiliateFormat.barcodeLength) {
                this.barcodeFormat = new AffiliateFormat(this.strBarcode);
            } else {
                throw "Barcode format undefined.";
            }
        } else {
            throw "Invalid Barcode number.";
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
        var isValid = false;
        var validationBlockCode = this.barcodeFormat.getValidationBarcodeFirstBlock();
        var verificationDigitCode = this.barcodeFormat.getBarcodeFirstBlockDigit();

        if(this.barcodeFormat.getBlocksModuleType() == FormatBase.TEN_MODULE) {
            isValid = this.isValidTenModule(validationBlockCode, verificationDigitCode);
        } else if(this.barcodeFormat.getBlocksModuleType() == FormatBase.ELEVEN_MODULE) {
            isValid = this.isValidElevenModule(validationBlockCode, verificationDigitCode);
        }

        return isValid;
    };

    isBarcodeSecondBlockValid() {
        var isValid = false;
        var validationBlockCode = this.barcodeFormat.getValidationBarcodeSecondBlock();
        var verificationDigitCode = this.barcodeFormat.getBarcodeSecondBlockDigit();

        if(this.barcodeFormat.getBlocksModuleType() == FormatBase.TEN_MODULE) {
            isValid = this.isValidTenModule(validationBlockCode, verificationDigitCode);
        } else if(this.barcodeFormat.getBlocksModuleType() == FormatBase.ELEVEN_MODULE) {
            isValid = this.isValidElevenModule(validationBlockCode, verificationDigitCode);
        }

        return isValid;
    };

    isBarcodeThirdBlockValid() {
        var isValid = false;
        var validationBlockCode = this.barcodeFormat.getValidationBarcodeThirdBlock();
        var verificationDigitCode = this.barcodeFormat.getBarcodeThirdBlockDigit();

        if(this.barcodeFormat.getBlocksModuleType() == FormatBase.TEN_MODULE) {
            isValid = this.isValidTenModule(validationBlockCode, verificationDigitCode);
        } else if(this.barcodeFormat.getBlocksModuleType() == FormatBase.ELEVEN_MODULE) {
            isValid = this.isValidElevenModule(validationBlockCode, verificationDigitCode);
        }

        return isValid;
    };

    isBarcodeFourthBlockValid() {
        var isValid = false;
        var validationBlockCode = this.barcodeFormat.getValidationBarcodeFourthBlock();
        var verificationDigitCode = this.barcodeFormat.getBarcodeFourthBlockDigit();

        if(this.barcodeFormat.getBlocksModuleType() == FormatBase.TEN_MODULE) {
            isValid = this.isValidTenModule(validationBlockCode, verificationDigitCode);
        } else if(this.barcodeFormat.getBlocksModuleType() == FormatBase.ELEVEN_MODULE) {
            isValid = this.isValidElevenModule(validationBlockCode, verificationDigitCode);
        }

        return isValid;
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
        var isValid = false;
        var validationBlockCode = this.barcodeFormat.getValidationBarcode();
        var verificationDigitCode = this.barcodeFormat.getBarcodeDigitCode();

        if(this.barcodeFormat.getCompleteBarcodeModuleType() == FormatBase.TEN_MODULE) {
            isValid = this.isValidTenModule(validationBlockCode, verificationDigitCode);
        } else if(this.barcodeFormat.getCompleteBarcodeModuleType() == FormatBase.ELEVEN_MODULE) {
            isValid = this.isValidElevenModule(validationBlockCode, verificationDigitCode);
        }

        return isValid;
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