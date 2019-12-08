const WS_URL ='ws://localhost:8000/'
var id =Math.random().toString(36).substr(2, 9);
const ws = new WebSocket(WS_URL,id);
ws.onopen = () => console.log(`Connected to ${WS_URL}`);
var i = 0;

ws.onmessage = message => {
    console.log(message);
    let data = message.data.split('_')[1]
    var result = document.getElementById("rootMessage");
    var textHTML = "<li class='p-1 rounded mb-1'><div class='receive-msg'><img src='http://nicesnippets.com/demo/image1.jpg'><div class='receive-msg-desc  text-center mt-1 ml-1 pl-2 pr-2'><p class='pl-2 pr-2 rounded'>"+data+"</p></div> </div></li>"
    result.innerHTML = result.innerHTML + textHTML ;
    scrollMess();
}
function onSubmit(event){
    if(event.key==='Enter'){
        var inputMesage = document.getElementById('inputMessage');
        var message = inputMesage.value;
        var result = document.getElementById("rootMessage");
        var textHTML = "<li class='pl-2 pr-2 bg-primary rounded text-white text-center send-msg mb-1'>"+message+"</li>"
        result.innerHTML = result.innerHTML + textHTML ;
        inputMesage.value='';
        ws.send(id+'_'+message+'_bot')
        scrollMess();
    }
    
}
function getID(){
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

function scrollMess(){
    let divScroll = document.getElementById('scrollId')
    divScroll.scrollTop = divScroll.scrollHeight - divScroll.clientHeight
}
$('.hide-chat-box').click(function(){
    $('.chat-content').slideToggle('slow');
});

//minh chat
{/* <li class="pl-2 pr-2 bg-primary rounded text-white text-center send-msg mb-1">hi</li> */}

// bot chat
{/* <li class="p-1 rounded mb-1"><div class="receive-msg"><img src="http://nicesnippets.com/demo/image1.jpg"><div class="receive-msg-desc  text-center mt-1 ml-1 pl-2 pr-2"><p class="pl-2 pr-2 rounded">hello</p></div> </div></li> */}


