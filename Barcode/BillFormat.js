const dateFormat = require("dateformat");

class BillFormat {
    static barcodeLength = 47;
    strBillPattern = "AAABCCCCCXDDDDDDDDDDYEEEEEEEEEEZKUUUUVVVVVVVVVV";
    objBillPattern = {A:"", B:"", C:"", X:"", D:"", Y:"", E:"", Z:"", K:"", U:"", V:""};
    strBarcode = "";

    constructor(strBarcode) {
        this.strBarcode = strBarcode;
        this.isBarcodeLengthValid();
        this.prepareBillPattern();
    };

    isBarcodeLengthValid() {
        if(this.strBarcode.length < this.barcodeLength) {
            throw "BillFormat barcode length not valid";
        }
    }

    prepareBillPattern() {
        for(var i = 0; i < this.strBillPattern.length; i++) {
            this.objBillPattern[this.strBillPattern[i]] += this.strBarcode[i];
        }
    };

    getBankCode() {
        return this.objBillPattern["A"];
    };

    getCurrencyCode() {
        return this.objBillPattern["B"];
    };

    getBarcodeDigitCode() {
        return this.objBillPattern["K"];
    };

    getExpirationFactor() {
        return this.objBillPattern["U"];
    };
    getFormattedExpirationDate() {
        var date = new Date('1997-10-07');
        date.setDate(date.getDate() + parseInt(this.getExpirationFactor()));
        var dateStr = dateFormat(date, 'yyyy-mm-dd');
        return dateStr;
    };

    getAmount() {
        return this.objBillPattern["V"];
    };
    getFormattedAmount() {
        return parseInt(this.getAmount()) / 100;
    };

    getBarcodeFirstBlock() {
        return this.getBankCode() + this.getCurrencyCode() + this.getBarcodeDigitCode() + this.getExpirationFactor() + this.getAmount();
    };
    getNoDigitCodeBarcodeFirstBlock() {
        return this.getBankCode() + this.getCurrencyCode() + this.getExpirationFactor() + this.getAmount();
    };

    /*
     * This is just for compatibility, there is no first block for validation in this format.
     */
    getBarcodeFirstBlockDigit() {
        return 0;
    };
    getValidationBarcodeFirstBlock() {
        return '0000000000';
    };

    getValidationBarcodeSecondBlock() {
        return this.getBankCode() + this.getCurrencyCode() + this.getBarcodeSecondBlock();
    };
    getValidationBarcodeThirdBlock() {
        return this.getBarcodeThirdBlock();
    };
    getValidationBarcodeFourthBlock() {
        return this.getBarcodeFourthBlock();
    };

    getBarcodeSecondBlock() {
        return this.objBillPattern["C"];
    };
    getBarcodeSecondBlockDigit() {
        return this.objBillPattern["X"];
    };

    getBarcodeThirdBlock() {
        return this.objBillPattern["D"];
    };
    getBarcodeThirdBlockDigit() {
        return this.objBillPattern["Y"];
    };

    getBarcodeFourthBlock() {
        return this.objBillPattern["E"];
    };
    getBarcodeFourthBlockDigit() {
        return this.objBillPattern["Z"];
    };

    getConvertedBarcode() {
        return this.getBarcodeFirstBlock() + this.getBarcodeSecondBlock() + this.getBarcodeThirdBlock() + this.getBarcodeFourthBlock();
    };

    getValidationBarcode() {
        return this.getNoDigitCodeBarcodeFirstBlock() + this.getBarcodeSecondBlock() + this.getBarcodeThirdBlock() + this.getBarcodeFourthBlock();
    };

    getText(){
        return "billFormat";
    };
};

module.exports = BillFormat;