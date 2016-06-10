function Mess(options){
    options = options || {};
    this.message = options.message || false;
    this.time = options.time || 5000;
    this.style = options.style || {};
}

Mess.prototype.init = function() {
    window.mess = window.mess === undefined? this : window.mess;
    this.style.backgroundColor  = this.style.backgroundColor || 'rgba(0, 0, 0, 0.8)';
    this.style.boxSizing        = this.style.boxSizing || 'border-box';
    this.style.bottom           = this.style.bottom || 0;
    this.style.color            = this.style.color || '#fff';
    this.style.display          = this.style.display || 'block';
    this.style.left             = this.style.left || '50%';
    this.style.padding          = this.style.padding || '.5em';
    this.style.position         = this.style.position || 'absolute';
    this.style.transform        = this.style.transform || 'translate(-50%, 0)';

    var alreadyAdded = document.getElementById('mess-messElement') !== null;
    var messElem = alreadyAdded? document.getElementById('mess-messElement') : document.createElement('span');
    messElem.id = "mess-messElement";

    for(var property in this.style){
        if(Object.prototype.hasOwnProperty.call(this.style, property))
            messElem.style[property] = this.style[property];
    }
    if(!alreadyAdded)
        document.body.appendChild(messElem);
    this.messElem = messElem;
    if(this.message != undefined && this.message){
        console.log(this.message);
        messElem.textContent = this.message;
        this.fadeIn();
    }
};


Mess.prototype.fadeOut = function (){
    var messElem = this.messElem;
    messElem.style.opacity = 1;

    (function fade() {
        if ((messElem.style.opacity -= 0.05) <= 0) {
            messElem.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

Mess.prototype.fadeIn = function(display) {
    var messElem = this.messElem;
    messElem.style.opacity = 0;
    messElem.style.display = display || "block";

    (function fade() {
        var val = parseFloat(messElem.style.opacity);
        if (!((val += 0.05) >= 1)) {
            messElem.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
    setTimeout(function () {
        window.mess.fadeOut(window.mess.messElem);
    }, window.mess.time);
};

Mess.prototype.show = function(string) {
    this.message = string;
    this.messElem.textContent = string;
    this.fadeIn();
};
