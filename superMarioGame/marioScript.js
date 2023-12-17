var rocketID = 0;
var rocketRemoveCount = 0;
var interval; 

$(function () {
    interval = setInterval(createRocket, 3000);
    var interval2 = setInterval(checkGame, 1000); 
    var count = 0;
    backStart();
    $("#jumpButton").on("keypress", function () {
        $("#mario").animate({
            top: '100px'
        }, 200, function () { 
            $(this).animate({
                top: '360px'
            }, 200);
        });
    });

    $("#jumpButton").on("click", function () {
        $("#mario").animate({
            top: '100px'
        }, 200, function () {
            $(this).animate({
                top: '360px'        
            }, 250);
        });
    });

    $("#stopButton").on("click", function () {
        clearInterval(interval);
    });
});

function checkGame() {
    for(index = rocketRemoveCount; index < rocketID; index++) {
        var x = parseInt($("#rocket" + index).css("left").replace("px", ""));
        if(x <= -100) {
            console.log("rocket" + index + " removed"); 
            $("#rocket" + index).remove();
            rocketRemoveCount++; 
        }
        // mario와 rocket이 충돌했을 경우 코드 구현하기
        
        var mario = $("#mario");
        var rocket = $("#rocket" + index); 

        if(checkCrush(mario, rocket) == true) {
            console.log("collided!");
            rotateMario(); 
            $("#gameover").css("display", "block"); 
            clearInterval(interval);
            break;
        } else {
            console.log("OK!"); 
        }
    }
}

function checkCrush (mario, rocket) {
        var marioPos = mario.offset();
        var rocketPos = rocket.offset();
 
        console.log(marioPos);
        console.log(rocketPos);

        console.log(marioPos.left);
        console.log(rocketPos.left);

        if (marioPos.left < rocketPos.left + rocket.width() &&
             marioPos.left + mario.width() > rocketPos.left &&
             marioPos.top < rocketPos.top + rocket.height() &&
             marioPos.top + mario.height() > rocketPos.top ) 
        {
                return true;
            } else {
                return false; 
        }
}



function createRocket() {
    $("#outterBox").append("<div id='rocket" + rocketID + "' class='mushroomStyle'>" + "<img src='img/mushroom.png' width='100%' height='100%'>" + "</div>");
    $("#rocket" + rocketID).animate({
        left: '-100px'
    }, 3000);
    rocketID++;
}

function backStart() {
    $("#background").css("left", "0px");
    $("#background").animate({
        left: '-1000px'
    } , 5000, "linear", backStart);
}

function rotateMario() {
    $("#mario").animate({
        rotate: '360deg'    
    }, {
        duration: 2000,
        step: function (now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        }
    });
}