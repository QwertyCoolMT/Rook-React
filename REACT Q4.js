//Testing setup
function basis (amt) {return amt};
function extra(amt) {return amt};
let ONTARIO_RATE = 5;
let QUEBEC_RATE = 5;
let ALBERTA_RATE = 5;
let BRITISH_COLUMBIA_RATE = 5;
let NEWFOUNDLAND_RATE = 5;
let base = 100;
['ONTARIO', 'QUEBEC','ALBERTA', 'BRITISH_COLUMBIA','NEWFOUNDLAND'].forEach((province) =>{

   //refactored code
   amt = base * (['ONTARIO','QUEBEC','ALBERTA'].some((element)=> element == province))? eval(`${province}_RATE`) : 1
   calc = 2 * basis(amt) + extra(amt) *1.05;

   //print test
   console.log(province, calc)
})