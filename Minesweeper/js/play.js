//MVC 
var Model = ( ()=> {


})();

var View = ( function() {
    const DOMstrings = {
        easyBtn: document.querySelector('#easy-btn'),
        medBtn: document.querySelector('#medium-btn'),
        hardBtn: document.querySelector('#hard-btn')
    }
    return{
        DOM: DOMstrings
    }

})();


var Control = ( (view,model)=> {
    DOMstrings = view.DOM;
    const setupEventListeners = () =>{
        DOMstrings.easyBtn.addEventListener('click', () => {
            DOMstrings.medBtn.style.animation = 'goDown 1.5s ease';
            DOMstrings.hardBtn.style.animation = 'goDown 1.5s ease';
            DOMstrings.easyBtn.style.animation = 'goRight 1.5s ease';
            DOMstrings.medBtn.style.animationFillMode = 'forwards';
            DOMstrings.hardBtn.style.animationFillMode = 'forwards';
            DOMstrings.easyBtn.style.animationFillMode = 'forwards';
            setTimeout(function(){
                window.location = 'game.html#';
            }, 1450);
        });
        DOMstrings.medBtn.addEventListener('click', () => {
            DOMstrings.hardBtn.style.animation = 'goDown 1.5s ease';
            DOMstrings.easyBtn.style.animation = 'goDown 1.5s ease';
            DOMstrings.hardBtn.style.animationFillMode = 'forwards';
            DOMstrings.easyBtn.style.animationFillMode = 'forwards';
            setTimeout(function(){
                window.location = 'game.html##';
            }, 1450);
        });
        DOMstrings.hardBtn.addEventListener('click', () => {
            DOMstrings.medBtn.style.animation = 'goDown 1.5s ease';
            DOMstrings.hardBtn.style.animation = 'goLeft 1.5s ease';
            DOMstrings.easyBtn.style.animation = 'goDown 1.5s ease';
            DOMstrings.medBtn.style.animationFillMode = 'forwards';
            DOMstrings.hardBtn.style.animationFillMode = 'forwards';
            DOMstrings.easyBtn.style.animationFillMode = 'forwards';
            setTimeout(function(){
                window.location = 'game.html###';
            }, 1450);
        });
    }
    return{
        init: () =>{
            console.log("START");
            setupEventListeners();
        }
    }
})(View,Model);

Control.init();
