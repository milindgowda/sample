//MVC 
images = {
    nums:  ['','https://i.imgur.com/KYerTkL.png','https://i.imgur.com/Mvcv026.png','https://i.imgur.com/WAkmroj.png','https://i.imgur.com/jqedxPB.png','https://i.imgur.com/HpObaor.png'],
    mine: 'https://i.imgur.com/htKRVDL.png',
    lost: 'https://i.imgur.com/o2VVsAH.png',
    smile: 'https://i.imgur.com/M7G4SV1.png',
    win: 'https://i.imgur.com/HOfmXZU.png',
    flag: 'https://i.imgur.com/pnMCEOo.png',
    surprise: 'https://i.imgur.com/654v4gJ.png'
}



var Model = ( ()=> {
    let state = {
        firstClick: false,
        
    };

    const isValid = (i,j) => {
        return (i>=0&&j>=0&&i<state.n&&j<state.n);
    }

    const surround = (x,y) => {
        for(let i=x-1;i<=x+1;i++){
            for(let j=y-1;j<=y+1;j++){
                if(isValid(i,j)&&state.grid[i][j]!==-1){
                    state.grid[i][j] = parseInt(state.grid[i][j])+1;
                }
            }
        }
    };

    const dfs = (x,y) => {
        if(isValid(x,y)){
            x = parseInt(x);
            y = parseInt(y);
            if(state.grid[x][y]===0&&!state.arr.includes(`${x},${y}`)){
                state.arr.push(`${parseInt(x)},${parseInt(y)}`);
                dfs(x,y+1);
                dfs(x+1,y);
                dfs(x-1,y);
                dfs(x,y-1);
            }
            else if(!state.arr.includes(`${x},${y}`)){
                state.arr.push(`${x},${y}`);
            }
        }
    };

    return{
        calcDifficulty : () => {
            const currUrl = window.location.href;
            const n=currUrl.length;
            let hash=0;
            for(let i=n-1;i>0;i--){
                if(currUrl[i]=='#') hash++;
                else break;
            }
            return hash;
        },
        makeGrid: (n) => {
            state.grid = new Array(n);
            for(let i=0;i<n;i++) state.grid[i] = new Array(n);
            for(let i=0;i<n;i++){
                for(let j=0;j<n;j++) state.grid[i][j] = 0;
            }
        },
        placeMines: (mines,n) => {
            let cord = [];
            let temp = mines;
            while(temp>0){
                const i = Math.floor(Math.random()*n);
                const j = Math.floor(Math.random()*n);
                try{
                    if(!cord.includes(`${i},${j}`)){
                        state.grid[i][j] = -1;
                        cord.push(`${i},${j}`);
                        temp--;
                    }
                }
                catch(err){
                    location.reload();
                }
            }
            state.mineIDs = cord;
        },
        state,
        addNumbers: () => {
            for(let i=0;i<state.n;i++){
                for(let j=0;j<state.n;j++){
                    if(state.grid[i][j]===-1){
                        surround(i,j);
                    }
                }
            }
        },
        openCells: (x,y) => {
            state.arr = [];
            dfs(x,y);
            const temp = state.arr;
            state.arr = [];
            for(let i=0;i<temp.length;i++){
                const t = temp[i].split(',');
                const x = parseInt(t[0]);
                const y = parseInt(t[1]);
                if(state.canClick[x][y]) state.covered--;
                state.canClick[x][y] = false;
            }
            return temp;
        },
        makeCanClick: (n) => {
            state.canClick = new Array(n);
            for(let i=0;i<n;i++) state.canClick[i] = new Array(n);
            for(let i=0;i<n;i++){
                for(let j=0;j<n;j++) state.canClick[i][j] = true;
            }
        },
        makeFlagBool: (n) => {
            state.flagClick = new Array(n);
            for(let i=0;i<n;i++) state.flagClick[i] = new Array(n);
            for(let i=0;i<n;i++){
                for(let j=0;j<n;j++) state.flagClick[i][j] = false;
            }
        },
        didWin: () => {
            return state.covered===state.mineIDs.length;
        },
        disableClick: () => {
            for(let i=0;i<state.n;i++){
                for(let j=0;j<state.n;j++) state.canClick[i][j] = false;
            }
        }
    }
})();

var View = ( function() {
    const DOMstrings = {

    };

    const alignTable= (n)=>{
        let td;
        const mainTable = document.querySelector('.main-table');
        const grid = document.querySelector('.game-grid');
        if(n==10){
            td=5;
        }
        if(n==16){
            td=4;
        }
        if(n==24){
            td=3;
        }
        mainTable.style.width = `${td*n+2}vmin`;
        mainTable.style.height = `${td*n+2}vmin`;
        grid.style.width = `${td*n+2}vmin`;
        grid.style.height = `${td*n+2}vmin`;
        grid.style.marginLeft = `calc((100vw - ${td}vmin * ( ${n} ) ) / 2)`;
        grid.style.marginRight = `calc((100vw - ${td}vmin * ( ${n} + 2) ) / 2)`;
        grid.style.marginTop = `${30-n}vmin`;
        document.querySelector('.tblcol').style.width = `${td}vmin`;
        document.querySelector('.tblcol').style.height = `${td}vmin`;
    };

    return{
        DOM: DOMstrings,
        maketable: (n) =>{
            let markup = `<table class="main-table">`;
            for(let i=0;i<n;i++){
                let rowMarkup = `<tr>`;
                for(let j=0;j<n;j++) {
                    rowMarkup += `<td class="tblcol" id = "${i},${j}"></td>`;
                }
                rowMarkup += `</tr>`;
                markup+=rowMarkup;
            }
            markup+=`</table>`; 
            document.querySelector('.game-grid').innerHTML = markup;
            alignTable(n);
        },
        mineReveal: (id) => {
            const element = document.getElementById(id);
            element.style.animation = `fadeOut 1s ease`;
            //element.style.animationFillMode = `forwards`;
            setTimeout(() => {
                element.style.background = `url(${images.mine})`;
                element.style.backgroundSize =  `cover`;
            },500);
        },
        revealNum: (id,val) => {
            const element = document.getElementById(id);
            element.style.animation = `fadeOut 1s ease`;
            //element.style.animationFillMode = `forwards`;
            setTimeout(() => {
                element.style.background = `url('${images.nums[val]}')`;
                element.style.backgroundSize =  `cover`;
            },500);
        },
        reveal: (id) => {
            const element = document.getElementById(id);
            element.style.animation = `fullFadeOut 1s ease`;
            element.style.animationFillMode = `forwards`;
        },
        revealAllMines: (arr) => {
            for(let i=0;i<arr.length;i++){
                View.mineReveal(arr[i]);
            }
        },
        updateTimer: (min,sec)=> {
            let adjust = "0";
            if(min<10) min = adjust.concat(String(min));
            if(sec<10) sec = adjust.concat(String(sec));
            try{
                document.querySelector('.time-change').textContent = `${min} : ${sec}`;
            }
            catch{
                return;
            }
        },
        changeSmiley: (mood) => {
            if(mood==='win') document.querySelector('.smiley').style.background = `url(${images.win})`;
            if(mood==='lost') document.querySelector('.smiley').style.background = `url(${images.lost})`;
            if(mood==='smile') document.querySelector('.smiley').style.background = `url(${images.smile})`;
            if(mood==='surprise') document.querySelector('.smiley').style.background = `url(${images.surprise})`;
            document.querySelector('.smiley').style.backgroundSize = `cover`;
        }
    }
})();


const runTimer = () => {
    View.updateTimer(Model.state.min,Model.state.sec);
    Model.state.sec++;
    if(Model.state.sec>=60){
        Model.state.min++;
        Model.state.sec=0;
    }
    setTimeout(runTimer,1000);
}

var Control = ( (view,model)=> {
    DOMstrings = view.DOM;
    
    const constructPage = () =>{
        const difficulty = model.calcDifficulty();
        let mines;
        if(difficulty==1){
            model.state.n=10;
            model.state.mines = 10;
        }
        if(difficulty==2){
            model.state.n=16;
            model.state.mines = 40;
        }
        if(difficulty==3){
            model.state.n=24;
            model.state.mines = 100;
        }
        view.maketable(model.state.n);
        model.makeGrid(model.state.n);
        model.makeCanClick(model.state.n);
        model.makeFlagBool(model.state.n);
        setTimeout(model.placeMines(model.state.mines,model.state.n),700);
        setTimeout(model.addNumbers(),800);
    }

    const decide = (id) => {
        const cod = id.split(',');
        if(!model.state.canClick[cod[0],cod[1]]) return;
        let arr = model.openCells(cod[0],cod[1]);
        if(model.state.mineIDs.includes(arr[0])){
            //arr = model.state.mineIDs;
            view.revealAllMines(model.state.mineIDs);
            document.querySelector('.time-change').className = `time-change-stop`;
            view.changeSmiley('lost');
            model.state.winState = 'lost';
            model.disableClick();
        }
        const temp = arr[0].split(',');
        if(model.state.grid[parseInt(temp[0])][parseInt(temp[1])]===0){
            view.changeSmiley('surprise');
            //setTimeout(view.changeSmiley('smile'),2000);
        }
        else if(model.state.grid[parseInt(temp[0])][parseInt(temp[1])]>0){
            view.changeSmiley('smile');
        }
        for(let i=0;i<arr.length;i++){
            const temp = arr[i].split(',');
            const x = temp[0];
            const y = temp[1];
            if(model.state.grid[x][y]===-1) view.mineReveal(arr[i]);
            else if(model.state.grid[x][y]>0)view.revealNum(arr[i],model.state.grid[x][y]);
            else view.reveal(arr[i]);
        }
        if(model.didWin()){
            view.changeSmiley('win');
            model.disableClick();
            model.state.winState = 'win';
            document.querySelector('.time-change').className = `time-change-stop`;
        }
    }

    const setupEventListeners = () =>{
        document.querySelector('.main-table').addEventListener('click', (event) => {
            let id = event.path[0].getAttribute('id');
            id = id.split(',');
            const i = parseInt(id[0]);
            const j = parseInt(id[1]); 
            if(model.state.canClick[i][j]){
                if(!model.firstClick){
                    runTimer();
                    model.firstClick=true;
                }
                decide(event.path[0].getAttribute('id'));
            }
        });
        document.querySelector('.main-table').addEventListener('contextmenu', (event) => {
            event.preventDefault();
            let id = event.path[0].getAttribute('id');
            id = id.split(',');
            const i = parseInt(id[0]);
            const j = parseInt(id[1]);      
            if(!model.state.flagClick[i][j]&&model.state.canClick[i][j]){
                document.getElementById(id).style.background = `url(${images.flag})`;
                document.getElementById(id).style.backgroundSize =  `cover`;
                model.state.flagClick[i][j] = true;
                model.state.flags--;
            }
            else if(model.state.flagClick[i][j]&&model.state.canClick[i][j]){
                document.getElementById(id).style.background = '#F2F3F4';
                model.state.flagClick[i][j] = false;
                model.state.flags++;
            }
            document.querySelector('.flag-change').innerHTML = `${model.state.flags}`;
            return false;
        },false);
        document.querySelector('.smiley').addEventListener('click', () => {
            if(model.state.winState === 'lost' || model.state.winState === 'win') location.reload();
        })
    }

    const setupInitialValues = () => {
        model.state.min = 0;
        model.state.sec = 0;
        model.state.flags = model.state.mines;
        model.state.covered = model.state.n*model.state.n;
        model.state.winState = 'play';
        document.querySelector('.flag-change').innerHTML = `${model.state.flags}`;
    }

    return{
        init: () =>{
            constructPage();
            setupInitialValues();
            setupEventListeners();
        }
    }
})(View,Model);

Control.init();
