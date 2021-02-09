// const remote = require('electron').remote;

const op_bar = document.querySelector("#op_bar");
const refresh_btn = document.querySelector("#refresh_btn");
const copy_btn = document.querySelector(".copy_btn");

const slider = document.querySelector("#slider");
const slider_span = document.querySelector("#slider_span");

const incl_upper = document.querySelector("#incl_upper");
const incl_lower = document.querySelector("#incl_lower");
const incl_num = document.querySelector("#incl_num");
const incl_symbol = document.querySelector("#incl_symbol");

// const close_btn = document.querySelector(".close_btn");

var count = 16;
var password = '';

const keyToPass = {
    0: 'lowercase',
    1: 'uppercase',
    2: 'number',
    3: 'symbol'
}

refresh_btn.addEventListener('click', genPassword);
copy_btn.addEventListener('click', copyToClipboard);

// close_btn.addEventListener('click', function (e) {
//     alert("Closing ...");
//     // var win = remote.getCurrentWindow();
//     // win.close();
// });


const passKeys = {
    lowercase: 'qwertyuioplkjhgfdsazxcvbnm',
    uppercase: 'QWERTYUIOPLKJHGFDSAZXCVBNM',
    number: '0147896325',
    symbol: '~`!@#$%^&*()_-+=|[]{}":;?<>.,'
};

function copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = password;
    document.body.appendChild(el);

    try {
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        // alert("Copied: " + el.value);
    } catch (error) {
        console.log(error);
    }
}


function updateslider() {
    count = slider.value;
    slider_span.innerHTML = count;
    console.log(count);
}

function getPassKeysInt(a, b, c, d) {
    const _numArray = [a, b, c, d];
    const allowed = [];
    const notAllowed = [];


    for (let i = 0; i < 4; i++) {
        if (_numArray[i] == 1) {
            allowed.push(i);
        } else {
            notAllowed.push(i);
        }
    }

    var randNum = Math.floor(Math.random() * 4);

    for (var i = 0; i < 4; i++) {
        if (_numArray[i] == 0 && randNum == i) {
            let xRand = Math.floor(Math.random() * allowed.length);
            randNum = allowed[xRand];
        }
    }

    return randNum;
}

function genPassword() {
    updateslider();

    password = '';
    var _count = count;

    while (_count != 0) {
        var totalSum = incl_upper.checked + incl_lower.checked
            + incl_num.checked + incl_symbol.checked + 0;
        if (totalSum == 0) {
            console.log("Select Min One");
            alert("Select Min One");
            break;
        }

        var _keyToPassIdx = getPassKeysInt(incl_upper.checked,
            incl_lower.checked, incl_num.checked, incl_symbol.checked);
        // console.log(_keyToPassIdx);
        var _keyToPass = keyToPass[_keyToPassIdx];
        var _passKeys = passKeys[_keyToPass];
        var _passKeysLen = _passKeys.length;

        var digitSel = Math.floor(Math.random() * _passKeysLen);
        password += _passKeys[digitSel];


        _count--;
    }

    // console.log(password);
    op_bar.value = password;
    // console.log(incl_upper.checked);
}