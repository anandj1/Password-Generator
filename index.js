let inputnum =document.querySelector("[data_slider]");
let displaynum= document.querySelector("[data-length]")
let pass_display= document.querySelector("[display_password]")
let copy_display = document.querySelector("[data-copyMsg]")
let strength_indi= document.querySelector("[strength_indi]");
let btn_copy = document.querySelector("[btn-copy]")
let lowers= document.querySelector("#lower");
let uppers = document.querySelector("#upper");
let numbers = document.querySelector("#numbers");
let checks = document.querySelector("#symbols");
let btns = document.querySelector(".buttons");
let all = document.querySelectorAll("input[type=checkbox]");
 
//  Setting default values

let password = "";
let checkcont= 0;
let password_length = 10;
let symbols = '~!@#$%^&*()_+{}:"<>?=-[]' 


// Handle slider
function slidehandle(){
     inputnum.value=password_length;
     displaynum.innerText=password_length;

}
slidehandle();


// Set color of strength
function setindi(color){
    strength_indi.style.backgroundColor= color;

    
}

// Setting num range
function getrange(min,max){
    return Math.floor(min+ Math.random()*(max-min))

}
function generatenum(){
    return getrange(0,9);

}
function generateLowerCase(){
    return String.fromCharCode(getrange(97,122));


}
function generateUpperCase(){
    return String.fromCharCode(getrange(65,90));


}
function symbol(){
    let sym_range = getrange(0,symbols.length);
    return symbols.charAt(sym_range);



}
function shufflepassword(Array){
    //Fisher yates Method
    for(let i = 0;i<Array.length-1;i++){
        const rdm= Math.floor(Math.random()*(i+1));
        const temp =Array[i];
        Array[i]=Array[rdm];
        Array[rdm]=temp;
    }
    let str =""
    Array.forEach(function(e){
        str+=e;
    })
    return str;




}

function calcStrength(){
    let hasLower = false;
    let hasUpper= false;
    let hasnumber=false;
    let hasymbol=false;
    if (lowers.checked) hasLower=true;
    if(uppers.checked) hasUpper=true;
    if(numbers.checked) hasnumber=true;
    if(checks.checked) hasymbol=true;


    if(hasLower&&hasUpper&&hasnumber&&hasymbol&&password_length>=7){
        setindi("#0f0");
    }
    else if((hasUpper||hasymbol)&&(hasnumber||hasLower)&&(password_length>=7))
    {
        setindi("#FFFF00");
    }
     else {
        setindi("#FF0000");
    }

     
}
//  Text xopied to clipboard screen
async function copy_clip(){
    try{
        await navigator.clipboard.writeText(pass_display.value);
        copy_display.innerText= "copied";

    }
    catch(e){
        copy_display.innerText="Error";
    }
    copy_display.classList.add("active");
    setTimeout(function(){
        copy_display.classList.remove("active");
    },2000);


}
inputnum.addEventListener("input",function(e){
    password_length=e.target.value;
    slidehandle();


})
btn_copy.addEventListener('click',function(){
    if(password.length>1){
        copy_clip();
    }

})
function check_box_change(){
    checkcont=0;
    all.forEach(function(checkbox){
        if(checkbox.checked){
            checkcont++
        }
    });

    // Setting special condition
    if(password_length<checkcont){
        password_length=checkcont;
        slidehandle();
    }


}
// counts for each time change takes place in checkbox
all.forEach(function(checkbox){
    checkbox.addEventListener("change",check_box_change)

}
)
btns.addEventListener("click",function(){
    if(checkcont<=0){
        return 0;
    }
    if(password_length<checkcont){
        password_length=checkcont;
        slidehandle();
    }
   

    // New password set
    // Remove new password

    password="";
    // Checking checkboxes

    let funArr =[];
    if(lowers.checked){
        funArr.push(generateLowerCase)

    }
    if(uppers.checked){
        funArr.push(generateUpperCase)
    }
    if(checks.checked){
        funArr.push(symbol)
    }
    if(numbers.checked){
        funArr.push(generatenum)
    }

    // Compulsory addition of password
    for(let i=0;i<funArr.length;i++){
        password+=funArr[i]();
    }

    // Remaining  password

    for(let i=0;i<password_length-funArr.length;i++){
        let randIndex= getrange(0,funArr.length);
        password+= funArr[randIndex]();
    }

    // Shuffle password
    password=shufflepassword(Array.from(password));
    // Display pass
    pass_display.value=password;
    calcStrength();
    console.log(password)
    calcStrength();
    


})









 

