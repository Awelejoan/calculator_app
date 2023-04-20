const keys = document.querySelectorAll('.key')
const display_input = document.querySelector('.input')
const display_output = document.querySelector('.output')

let input = ''
for (const key of keys) {
    const value = key.dataset.key

    key.addEventListener('click', () => {
        if (value == 'clear') {
            input = ''
            display_input.innerHTML = ''
            display_output.innerHTML = ''
        }
        else if (value == 'backspace') {
            input = input.slice(0, -1)
            display_input.innerHTML = input
           

        }
        else if (value == '=') {
            let result = eval(prepareInput(input));
            // display_input.innerHTML = ''
            display_output.innerHTML = cleanOutput(result)
        }
        else if (value == '()') {
            if (input.indexOf('(') == -1 || input.indexOf('(') !== -1 && input.indexOf(')')
                !== -1 && input.lastIndexOf('(') < input.lastIndexOf(')')) {
                input += '('
            }
            else if (input.indexOf('(') !== -1 || input.indexOf(')') == -1 && input.indexOf('(')
                !== -1 && input.lastIndexOf('(') > input.lastIndexOf(')')) {
                input += ')'
            }
            display_input.innerHTML =input
        

        }
        else
        if(validateInput(value)) {
            input += value
            display_input.innerHTML =input

        }
    })
}
// function cleanInput(input) {
//     let inputArray = input.split('');
//     let inputArray_length=inputArray.length
//     for (let  i= 0;  i< inputArray_length; i++) {
//         if (inputArray[i]=='*') {
//             inputArray[i] = `<span class="operator">*<span/>`;
//         }
//         else if  (inputArray[i]=='/') {
//             inputArray[i] = ` <span class="operator">/<span/> `;
//         }
//         else if  (inputArray[i]=='+') {
//             inputArray[i] = ` <span class="operator">+<span/> `;
//         }
//         else if  (inputArray[i]=='-') {
//             inputArray[i] = ` <span class="operator">-<span/> `;
//         }
//         else if  (inputArray[i]=='(') {
//             inputArray[i] = ` <span class="operator">(<span/> `;
//         }
//         else if  (inputArray[i]==')') {
//             inputArray[i] = ` <span class="action">)<span/> `;
//         }
//         else if  (inputArray[i]=='%') {
//             inputArray[i] = ` <span class="action">%<span/> `;
//         }
//     }
//     return inputArray.join(" ")

// }
function cleanOutput(output) {
    let output_string = output.toString()
    let decimal = output_string.split('.')[1];
    output_string = output_string.split('.')[0]
    let output_array= output_string.split("")
    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i>0; i-=3) {
        output_array.splice(i, 0, ',')
            
        }
    }
    if(decimal){
        output_array.push('.');
        output_array.push(decimal);

    }
    return output_array.join('')
}

function validateInput(value){
    let last_input = input.slice(-1);
    let operators = ['+', '-', '*', '/'];

    if (value == '.' && last_input == '.') {
        return false;
    }
    if (operators.includes(value)) {
        if (operators.includes(last_input)) {
            return false   
        }
        else{
        return true}
    }
    return true
}

function prepareInput(input) {
    let inputArray = input.split('');
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i]=='%') {
            inputArray[i]='/100'
            
        }
        
        
    }
    return inputArray.join('')
}