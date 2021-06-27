const FormatBase = require('./FormatBase');
const dateFormat = require("dateformat");

class AffiliateFormat extends FormatBase {
    static barcodeLength = 48;
    strBillPattern = "PSRDVVVVVVVXUUUUEEEELLLYMMMMMMMMMMMZOOOOOOOOOOOK";
    objBillPattern = {P:"", S:"", R:"", D:"", V:"",U:"", X:"", E:"", L:"", Y:"", M:"", Z:"",O:"", K:""};
    objValidationModulesRef = {"6": FormatBase.TEN_MODULE, "7": FormatBase.TEN_MODULE, "8": FormatBase.ELEVEN_MODULE, "9": FormatBase.ELEVEN_MODULE};

    constructor(strBarcode) {
        super(strBarcode, AffiliateFormat.barcodeLength);
        this.isBarcodeLengthValid();
        this.prepareBillPattern();
    };

    getPoductCode() {
        return this.objBillPattern["P"];
    };

    getSegmentCode() {
        return this.objBillPattern["S"];
    };

    getCurrencyReferenceCode() {
        return this.objBillPattern["R"];
    };

    getBarcodeVerificationDigit() {
        return this.objBillPattern["D"];
    };

    getAmount() {
        return this.objBillPattern["V"] + this.objBillPattern["U"];
    };

    getFormattedAmount() {
        return parseInt(this.getAmount()) / 100;
    };

    getFormattedExpirationDate() {
        var companyOpenData = this.getCompanyOpenData();
        var dateStr = "";
        if(companyOpenData.length >= 8) {
            var tmpDateStr = companyOpenData.substr(0, 8);
            
            var tmpYear = tmpDateStr.substr(0, 4);
            var tmpMounth = tmpDateStr.substr(4, 2);
            var tmpDay = tmpDateStr.substr(6, 2);

            dateStr = tmpYear +'-'+ tmpMounth + '-' + tmpDay;
        }
        return dateStr;
    };

    getCompanyCode() {
        return this.objBillPattern["E"];
    };

    getCompanyOpenData() {
        return this.objBillPattern["L"] + this.objBillPattern["M"] + this.objBillPattern["O"];
    };

    getNoDigitCodeBarcodeFirstBlock() {
        return this.objBillPattern["P"] + this.objBillPattern["S"] + this.objBillPattern["R"] + this.objBillPattern["V"];
    };
    getValidationBarcodeFirstBlock() {
        return this.getBarcodeFirstBlock();
    };
    getBarcodeFirstBlock() {
        return this.objBillPattern["P"] + this.objBillPattern["S"] + this.objBillPattern["R"] + this.objBillPattern["D"] + this.objBillPattern["V"];
    };
    getBarcodeFirstBlockDigit() {
        return this.objBillPattern["X"];
    };

    getValidationBarcodeSecondBlock() {
        return this.getBarcodeSecondBlock();
    };
    getBarcodeSecondBlock() {
        return this.objBillPattern["U"] + this.objBillPattern["E"] + this.objBillPattern["L"];
    };
    getBarcodeSecondBlockDigit() {
        return this.objBillPattern["Y"];
    };

    getValidationBarcodeThirdBlock() {
        return this.getBarcodeThirdBlock();
    };
    getBarcodeThirdBlock() {
        return this.objBillPattern["M"];
    };
    getBarcodeThirdBlockDigit() {
        return this.objBillPattern["Z"];
    };

    getValidationBarcodeFourthBlock() {
        return this.getBarcodeFourthBlock();
    };
    getBarcodeFourthBlock() {
        return this.objBillPattern["O"];
    };
    getBarcodeFourthBlockDigit() {
        return this.objBillPattern["K"];
    };

    getConvertedBarcode() {
        return this.getBarcodeFirstBlock() + this.getBarcodeSecondBlock() + this.getBarcodeThirdBlock() + this.getBarcodeFourthBlock();
    };

    getValidationBarcode() {
        return this.getNoDigitCodeBarcodeFirstBlock() + this.getBarcodeSecondBlock() + this.getBarcodeThirdBlock() + this.getBarcodeFourthBlock();
    };
    getBarcodeDigitCode() {
        return this.objBillPattern["D"];
    };

    getBlocksModuleType() {
        return this.objValidationModulesRef[this.getCurrencyReferenceCode()];
    };

    getCompleteBarcodeModuleType() {
        return this.objValidationModulesRef[this.getCurrencyReferenceCode()];
    };

    getText(){
        return "AffiliateFormat";
    };
};

module.exports = AffiliateFormat;