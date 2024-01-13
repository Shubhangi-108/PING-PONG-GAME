var pingPong = document.querySelectorAll('.pingPong');
var ping = document.getElementById('ping');
var pong = document.getElementById('pong');
var ball = document.getElementById("ball");

var angle = [ 20 , 30 , 40 ];

var pingHeight = ping.offsetHeight + ping.offsetTop ;
var pongHeight = pong.offsetTop ;


//code for moving paddle


function setValue( value ){
    return value + 'px';
}


for( var i = 0 ; i < pingPong.length ; i++){
    pingPong[i].style.left = pingPong[i].offsetLeft + "px";
    document.addEventListener('keydown', handleKeyPress(i));
}

function handleKeyPress( index ){
    return function(event){
        var left = parseInt(pingPong[index].style.left);
        if (event.key === 'ArrowLeft') {
            if (left > 8) {
                pingPong[index].style.left = setValue(left - 10);
            }
        }
        else if(event.key === 'ArrowRight'){
            if (left < (window.innerWidth - pingPong[index].offsetWidth - 8)) {
                pingPong[index].style.left = setValue(left + 10);
            }
        }
    };
}




//code for ball

var ball = document.getElementById('ball');
var intervalId;
var animationId;
document.addEventListener('keydown' , function(event){
    if( event.key === 'Enter'){
        moveBall();
    }
})
var randomangle = angle[Math.floor(Math.random() * angle.length)];
var radians = randomangle * (Math.PI / 180);
var X = Math.cos(radians) * 3;
var Y = -Math.sin(radians) * 3;
var x = X;
var y = Y;
function moveBall() {
    var rect = ball.getBoundingClientRect();
    var pingUP = ping.getBoundingClientRect();
    var pongUP = pong.getBoundingClientRect();
    if (rect.left + ball.offsetWidth + x >= window.innerWidth || rect.left  + x <= 0) {
        x = -x;
    }

    if (rect.top + y <=  pingHeight && rect.left + ball.offsetWidth >= pingUP.left && rect.left  <= pingUP.width + pingUP.left ) {
        y = -y;
    }

    if (rect.top + ball.offsetWidth + y >= pongHeight && rect.left + ball.offsetWidth + x >= pongUP.left && rect.left  <= pongUP.width + pongUP.left ) {
        y = -y;
    }

    else if ( rect.top + ball.offsetWidth + y > window.innerHeight || rect.top + y <= 0){
        resetPosition();
        return;
    }

    ball.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    ball.style.left = rect.left + x + 'px';
    ball.style.top = rect.top + y + 'px'
    animationId = requestAnimationFrame(moveBall);
}

function resetPosition(){
    alert("you are out");
    location.reload();
}



