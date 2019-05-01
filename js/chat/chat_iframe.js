const chatList = document.getElementsByClassName('chatBox')

var chat1 = new ChatBox();
chat1.setProp(chatList[0])
var chat2 = new ChatBox();
chat2.setProp(chatList[1])

var target = null;
var resizeTarget = null;
var isClick = false;
var currentX = 0;
var currentY = 0;

var loop = null;

document.addEventListener("mousedown", (e) => {
    isClick = 1
    if (e.target.classList.contains("chatBox__resize")) {
        resizeTarget = e.target.parentElement
        currentSizeX = resizeTarget.controller.getSizeX()
        currentSizeY = resizeTarget.controller.getSizeY()
    } else if (e.target.parentElement.classList.contains("chatBox")) {
        isClick = 2
        target = e.target.parentElement
        
        ;[...chatList].forEach(x=>{
            x.style.zIndex = 0
        })
        target.style.zIndex = 10

        currentX = e.clientX - target.controller.getX()
        currentY = e.clientY - target.controller.getY()
        // if (loop) clearInterval(loop)
        // loop = setInterval(() => {
        //     if ((Math.abs(currentVelocityX) >= 0.0001 || Math.abs(currentVelocityY) >= 0.0001 || isClick == 2) && !resizeTarget) {
        //         var changeX = (target.controller.getX() + currentVelocityX)
        //         var changeY = (target.controller.getY() + currentVelocityY)

        //         if (changeX + target.controller.getSizeX() > innerWidth) {
        //             currentVelocityX += (((innerWidth - target.controller.getSizeX()) - target.controller.getX()) - currentVelocityX) / 60
        //         } else if (changeX < 0) {
        //             currentVelocityX += ((-target.controller.getX()) - currentVelocityX) / 60
        //         }

        //         if (changeY + target.controller.getSizeY() > innerHeight) {
        //             currentVelocityY += (((innerHeight - target.controller.getSizeY()) - target.controller.getY()) - currentVelocityY) / 60
        //         } else if (changeY < 0) {
        //             currentVelocityY += ((-target.controller.getY()) - currentVelocityY) / 60
        //         }
        //         currentVelocityX /= 1.15
        //         currentVelocityY /= 1.15

        //         target.controller.setPos(changeX, changeY)
        //     } else {
        //         target = null
        //         clearInterval(this)
        //     }
        // }, 1000 / 60)
    }
})
document.addEventListener("mousemove", (e) => {
    if (target && isClick) {
        target.controller.setVelocity((e.clientX - (target.controller.getX() + currentX)) / 5, (e.clientY - (target.controller.getY() + currentY)) / 5)
    }
    if (resizeTarget) {
        if (loop) clearInterval(loop)
        resizeTarget.controller.setSize(
            currentSizeX + (e.clientX - currentSizeX - resizeTarget.controller.getX()),
            currentSizeY + (e.clientY - currentSizeY - resizeTarget.controller.getY()))
    }
})
document.addEventListener("mouseup", (e) => {
    isClick = false;
    resizeTarget = null
})