
    //unit conversion function
    function convertHandler(){

        //number handler
        this.getNum = function(num){
            var result;
            num = num.match(/^([0-9.]*[\/\*\+\-]*[0-9.]*)([a-z]*)$/i);
            if(num !== null) {
                num = num[1];
                switch(num){
                    case "":
                     result = 1;
                     break;
                    case num:
                     result = new Function('return '+ num)();
                     break;
                    default: 
                     result = 'invalid number';
                }
            } else {
                result = 'invalid number';
            }
        
            return result;
        };

        //unit handler
        this.getUnit = function(unit){
            unit = unit.split(/^[0-9.]*[\+\-\*\/\]*[0-9.]*/gm).join('');
            const units = ['gal','l','mi','km','lbs','kg'];
            const index = units.indexOf(unit.toLowerCase());
            if(index !== -1){
               return unit;
            } else {
                return 'invalid unit';
            }
        };

        //return unit
        this.getReturnUnit = function(unit){
            const units = {
                gal: 'l',
                l: 'gal',
                km: 'mi',
                mi: 'km',
                kg: 'lbs',
                lbs: 'kg'
            };
            return units[unit.toLowerCase()];
        };

        //convert
        this.convert = function(num, unit){
            const galToL  = 3.78541;
            const kmTomi  = 1.60934;
            const kgToLbs = 0.453592;
            const units = {
                gal: num * galToL,
                l: num / galToL,
                km: num / kmTomi,
                mi: num * kmTomi,
                kg: num / kgToLbs,
                lbs: num * kgToLbs
            };
            return units[unit.toLowerCase()];  
        };

        //spell out unit
        this.spellOutUnit = function(unit){
            const units = {
                gal: 'gallons',
                l: 'liters',
                km: 'kilometers',
                mi: 'miles',
                kg: 'kilograms',
                lbs: 'pounds'
            }; 
            return units[unit.toLowerCase()];
        };
        
        this.getString = function(num, unit, returnNum, returnUnit){
            return `${num} ${this.spellOutUnit(unit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
        };
    }

module.exports = convertHandler;