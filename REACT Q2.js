function foobar(number){
    if (!(number^0 ===number)){
        console.log("input is not a positive integer.")
        return "error1"
    }else if (number <= 0){
        console.log("input is not a positive integer.")
        return "error2"
    }

    let return_string = "";
    if (number % 2 == 0){
        return_string ="foo"
    }
    if (number % 7 == 0){
        return_string += "bar"
    }
    return (return_string ? return_string : number) 
}
//test
for (let i = -1; i < 14*7+1; i++){
    console.log(`returning "${foobar(i)}" for ${i}`)
};