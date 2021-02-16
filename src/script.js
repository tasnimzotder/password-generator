const shell = require('electron').shell;
const words = require("./words");

const op_bar = document.querySelector("#op_bar");
const refresh_btn = document.querySelector("#refresh_btn");
const copy_btn = document.querySelector(".copy_btn");

const mode_select = document.querySelector(".mode_selector_input");

const slider = document.querySelector("#slider");
const slider_span = document.querySelector("#slider_span");

const incl_upper = document.querySelector("#incl_upper");
const incl_lower = document.querySelector("#incl_lower");
const incl_num = document.querySelector("#incl_num");
const incl_symbol = document.querySelector("#incl_symbol");

let switch_label = document.querySelectorAll(".switch-label");

// const close_btn = document.querySelector(".close_btn");


var count = 16;
var password = '';
var currSelectedOne = null;
var currSelectedOneNum = 0;

const keyToPass = {
    0: 'lowercase',
    1: 'uppercase',
    2: 'number',
    3: 'symbol'
}

const passKeys = {
    lowercase: 'qwertyuioplkjhgfdsazxcvbnm',
    uppercase: 'QWERTYUIOPLKJHGFDSAZXCVBNM',
    number: '0147896325',
    symbol: '~`!@#$%^&*()_-+={[}]|\:;\"\'<,>.?/'
};

const wordList = words;

function generatePassword() {
    if (mode_select.checked == true) {
        toggleSwitches(0);
        generatePassComplex();
    } else {
        toggleSwitches(1);
        generatePassMemorizable();
    }
}

function toggleSwitches(state) {
    if (state == 1) {
        incl_upper.disabled = true;
        incl_lower.disabled = true;
        incl_num.disabled = true;
        incl_symbol.disabled = true;

        for (var i = 0; i < 4; i++) {
            switch_label[i].style.opacity = 0.3;
        }
    } else {
        incl_upper.disabled = false;
        incl_lower.disabled = false;
        incl_num.disabled = false;
        incl_symbol.disabled = false;


        for (var i = 0; i < 4; i++) {
            switch_label[i].style.opacity = 1;
        }

        // currSelectedOne.disabled = true;
        switch_label[currSelectedOneNum].style.opacity = 0.3;
    }
}


function generatePassMemorizable() {
    let _count = count;
    let newPass = '';
    let isSpecialSelected = false;
    let isNumberSelected = false;
    let isCharUppercased = false;

    const wordlist_len = Object.keys(wordList).length;
    // alert(wordlist_len)

    while (_count > 0) {
        let rand1 = Math.floor(Math.random() * wordlist_len) + 1;

        if (isNumberSelected == false && rand1 == wordlist_len - 1) {
            isNumberSelected = true;
        } else if (isSpecialSelected == false && rand1 == wordlist_len) {
            isSpecialSelected = true;
        } else if ((isNumberSelected && rand1 == wordlist_len - 1) || (isSpecialSelected && rand1 == wordlist_len)) {
            continue;
        } else {
            rand1 = Math.min(rand1, _count);
        }

        if (rand1 == wordlist_len - 1) {
            let new_list = wordList[99];
            let rand2 = Math.floor(Math.random() * new_list.length);
            newPass += new_list[rand2];

            _count -= 1;
        } else if (rand1 == wordlist_len) {
            let new_list = wordList[999];
            let rand2 = Math.floor(Math.random() * new_list.length);
            newPass += new_list[rand2];

            _count -= 1;
        } else {
            let new_list = wordList[rand1];
            let rand2 = Math.floor(Math.random() * new_list.length);
            newPass += new_list[rand2];

            _count -= rand1;
        }

        // console.log(rand1, newPass);
    }
    if (newPass.length > 2) {
        while (!isCharUppercased) {
            let rand3 = Math.floor(Math.random() * newPass.length);
            if (newPass[rand3].toLowerCase() != newPass[rand3].toUpperCase()) {
                // console.log(newPass[rand3]);
                newPass = newPass.slice(0, rand3) + newPass[rand3].toUpperCase() + newPass.slice(rand3 + 1);
                isCharUppercased = true;
                // console.log("Hrll");
            } else {
                continue;
            }
        }

        // check it contains number and symbol
    }
    // alert(newPass);
    password = newPass;
    op_bar.value = password;
}


// generatePassMemorizable();

refresh_btn.addEventListener('click', generatePassword);
copy_btn.addEventListener('click', copyToClipboard);

// close_btn.addEventListener('click', function (e) {
//     alert("Closing ...");
//     // var win = remote.getCurrentWindow();
//     // win.close();
// });


function copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = op_bar.value;
    document.body.appendChild(el);

    try {
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    } catch (error) {
        console.log(error);
    }
}


function updateslider() {
    count = slider.value;
    slider_span.innerHTML = count;

    generatePassword();
    // console.log(count);
}

function incrementSlider() {
    slider.value++;
    updateslider();
}

function decrementSlider() {
    slider.value--;
    updateslider();
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

function manageSelectOptions(totalSum) {
    if (totalSum == 1) {
        if (incl_upper.checked == true) {
            currSelectedOne = incl_upper;
            currSelectedOneNum = 0;
            incl_upper.disabled = true;
        } else if (incl_lower.checked == true) {
            currSelectedOne = incl_lower;
            currSelectedOneNum = 1;
            incl_lower.disabled = true;

        } else if (incl_num.checked == true) {
            currSelectedOne = incl_num;
            currSelectedOneNum = 2;
            incl_num.disabled = true;

        } else if (incl_symbol.checked == true) {
            currSelectedOne = incl_symbol;
            currSelectedOneNum = 3;
            incl_symbol.disabled = true;
        }

        switch_label[currSelectedOneNum].style.opacity = 0.3;
        // generatePassword();
    } else if (totalSum > 1) {
        if (currSelectedOne !== null) {
            currSelectedOne.disabled = false;
            currSelectedOne = null;
        }
        switch_label[currSelectedOneNum].style.opacity = 1;
    }
}

function generatePassComplex() {
    // updateslider();

    password = '';
    var _count = count;
    var totalSum = incl_upper.checked + incl_lower.checked
        + incl_num.checked + incl_symbol.checked + 0;
    manageSelectOptions(totalSum);

    while (_count != 0) {

        if (totalSum == 0) {
            console.log("Select Min One");
            alert("Select Min One");
            break;
        }

        var _keyToPassIdx = getPassKeysInt(incl_lower.checked,
            incl_upper.checked, incl_num.checked, incl_symbol.checked);
        // console.log(_keyToPassIdx);
        var _keyToPass = keyToPass[_keyToPassIdx];
        var _passKeys = passKeys[_keyToPass];
        var _passKeysLen = _passKeys.length;

        var digitSel = Math.floor(Math.random() * _passKeysLen);
        password += _passKeys[digitSel];


        _count--;
    }

    op_bar.value = password;
}

const openLinkInBrowser = (link) => {
    shell.openExternal(link);
}