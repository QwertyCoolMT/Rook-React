var fs = require('fs');


function csv_to_array(filename){
    let arr = [];
    let data = fs.readFileSync(filename, 'utf8')
    let keys = [];
    data.split('\n').forEach((row_data,row_number) => {
        let values = {};
        row_data.split(',').forEach((cell, col) => {
            if (row_number === 0 ){
                keys.push(cell)
            }else{
                values[keys[col]] = cell
            }
        })
        if (row_number > 0){arr.push(values)}
    })
    return arr
}
function sum_vals(csv_array){
    let sum = 0
    csv_array.forEach((item) =>{sum += Number(item.value)})
    return sum
    
}

console.log(sum_vals(csv_to_array('data.csv')))
