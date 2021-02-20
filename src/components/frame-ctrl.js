const remote = require('electron').remote;

const close_ctrl = document.querySelector(".close-ctrl");
const minimize_ctrl = document.querySelector(".minimize-ctrl");


close_ctrl.addEventListener('click', function (e) {
    remote.getCurrentWindow().close();
});

minimize_ctrl.addEventListener('click', function (e) {
    remote.getCurrentWindow().minimize();
});