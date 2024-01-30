var expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler');

module.exports = function(app){
    const convertHandler = new ConvertHandler();
    //Home page
    app.route('/')
       .get((req, res) => {
        res.render(process.cwd() + '/views/index');
       });

    //unit conversion route
     app.route('/api/convert')
        .get((req, res) => {    
            if(req.query.input !== undefined){
                const num   = convertHandler.getNum(req.query.input);
                const unit  = convertHandler.getUnit(req.query.input);
                if(unit == 'invalid unit' && num == 'invalid number') {
                   res.send('invalid number and unit');    
                } else if(unit == 'invalid unit'){
                    res.send('invalid unit');
                } else if(num == 'invalid number'){
                    res.send('invalid number');
                } else {
                    const returnUnit = convertHandler.getReturnUnit(unit);
                    const returnNum = convertHandler.convert(num, unit);
                    const toString = convertHandler.getString(num, unit, returnNum, returnUnit);
                    
                    res.json({
                        'initNum': num,
                        'initUnit': unit,
                        'returnNum': returnNum,
                        'returnUnit': returnUnit,
                        'string': toString
                      });
                }
            } else {
                res.send('invalid input');  
            }
       });

}