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
        console.log(this.strBarcode.length < this.barcodeLength);
        if(this.strBarcode.length < this.barcodeLength) {
            throw "BillFormat barcode length not valid";
        }
    }

    prepareBillPattern() {
        for(var i = 0; i < this.strBillPattern.length; i++) {
            this.objBillPattern[this.strBillPattern[i]] += this.strBarcode[i];
        }
        console.log(this.objBillPattern);
        console.log("Convertido :: " + this.getConvertedBarcode());
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
    }

    getText(){
        return "billFormat";
    };
};

module.exports = BillFormat;