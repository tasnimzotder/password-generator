let count = 16;

const wordList = {
    1: ['a', 'b'],
    2: ['an', 'is', 'an', 'on', 'it', 'me', 'he'],
    3: ['one', 'two', 'six', 'ten', 'she', 'fix'],
    4: ['four', 'nine'],
    99: ['$', '%', '*', '@'],
    999: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}


function generatePassMemorizable() {
    let _count = count;
    let newPass = '';
    let isSpecialSelected = false;
    let isNumberSelected = false;
    let isCharUppercased = false;

    while (_count > 0) {
        let rand1 = Math.floor(Math.random() * 6) + 1;

        if (isNumberSelected == false && rand1 == 5) {
            isNumberSelected = true;
        } else if (isSpecialSelected == false && rand1 == 6) {
            isSpecialSelected = true;
        } else if ((isNumberSelected && rand1 == 5) || (isSpecialSelected && rand1 == 6)) {
            continue;
        } else {
            rand1 = Math.min(rand1, _count);
        }

        if (rand1 == 5) {
            let new_list = wordList[99];
            let rand2 = Math.floor(Math.random() * new_list.length);
            newPass += new_list[rand2];

            _count -= 1;
        } else if (rand1 == 6) {
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

        console.log(rand1, newPass);
    }
    if (newPass.length > 2) {
        while (!isCharUppercased) {
            let rand3 = Math.floor(Math.random() * newPass.length);
            if (newPass[rand3].toLowerCase() != newPass[rand3].toUpperCase()) {
                console.log(newPass[rand3]);
                newPass = newPass.slice(0, rand3) + newPass[rand3].toUpperCase() + newPass.slice(rand3 + 1);
                isCharUppercased = true;
                // console.log("Hrll");
            } else {
                continue;
            }
        }
    }


    console.log(newPass);
    newPass = '';

}

generatePassMemorizable();