//MVC 


var Model = ( ()=> {


})();

var View = ( function() {
    const DOMstrings = {
        playBtn: document.querySelector('#play-btn'),
        easyBtn: document.querySelector('#easy-btn'),
        medBtn: document.querySelector('#medium-btn'),
        hardBtn: document.querySelector('#hard-btn')
    }
    return{
        DOM: DOMstrings,
        delayOpen: () =>{              
            setTimeout(function(){
                window.location = 'play.html';
            }, 1450);
        }
    }

})();


var Control = ( (view,model)=> {
    DOMstrings = view.DOM;
    const setupEventListeners = () =>{
        DOMstrings.playBtn.addEventListener('click',()=>{
            DOMstrings.playBtn.style.animation = 'btnAnime 1.5s ease';
            view.delayOpen();
        });
        DOMstrings.easyBtn.addEventListener('click', () => {
            DOMstrings.medBtn.style.animation = 'goDown 1.5s ease';
            DOMstrings.hardBtn.style.animation = 'goDown 1.5s ease';
        })
    }
    return{
        init: () =>{
            console.log("START");
            setupEventListeners();
        }
    }
})(View,Model);

Control.init();