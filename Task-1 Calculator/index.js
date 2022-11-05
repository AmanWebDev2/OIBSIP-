const btn = document.querySelectorAll('.btn');
const calcScreen = document.getElementById('calculator-screen');
let expression = '';
Array.from(btn).forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let clickedBtn = e.target;
        if(clickedBtn.classList.contains('clearAll') || clickedBtn.classList.contains('evaluate') || clickedBtn.classList.contains('backspace') ){
            if(clickedBtn.classList.contains('evaluate')){
                evaluateExpression(expression);
            }else if(clickedBtn.classList.contains('clearAll')) {
                calcScreen.value = '';
                expression = '';
            }else if(clickedBtn.classList.contains('backspace')) {
                calcScreen.value = calcScreen.value.slice(0,calcScreen.value.length-1)
                expression = expression.substring(0,expression.length-1);
            }
        }else{
            calcScreen.value+= clickedBtn.textContent;
            if(clickedBtn.classList.contains('multiplication')){
                expression+='*';
            }else if(clickedBtn.classList.contains('divide')) {
                expression+='/';
            }else{
                expression+=clickedBtn.textContent;
            }

            if(clickedBtn.classList.contains('evaluate')){
                evaluateExpression(expression);
            }
            console.log(expression)

        }
    })
})

const evaluateExpression=(expression)=>{
    try {
        let res = eval(expression);
        console.log(res);
    }catch (err) {
        console.error(err);
    }
}
