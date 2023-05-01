window.addEventListener("load", function(){

    getList();
    // let list = document.querySelector("#list");
    // list.innerHTML = "<h1>로딩완료</h1>"


})

function getList(){

    // 준비
    let xhr = new XMLHttpRequest();

    // setting
    let url = "https://zdnet.co.kr/news/?lstcode=0060&page=1";
    url = "https://api.allorigins.win/get?url="+encodeURIComponent(url);
    xhr.open("get", url);

    

    // 실행
    xhr.send();

    // 얻어온 결과물을 가지고
    // 접속 완료 이벤트가 실행됨
    xhr.onload = function(){
        let data = xhr.responseText;
        console.log("-----------------")
        // console.log(data)
        // allorigins.win 사용할 때만 필요함
        let json_data = JSON.parse(data);

        // 해당 사이트의 html을 text로 확보
        data = json_data.contents;
        // console.log(html)

        // text로 된 html을 DOM 형태로 변환
        let domParser = new DOMParser();
        let html = domParser.parseFromString(data, "text/html");


        // 가져온 내용을 원하는것만 선택
        let list_newsPost = html.querySelectorAll(".newsPost");
        let title_0 = list_newsPost[0].querySelector(".assetText h3").innerHTML;
        console.log(title_0);
        let title_1 = list_newsPost[1].querySelector(".assetText h3").innerHTML;
        console.log(title_1);

        let img_1 = list_newsPost[0].querySelector(".assetThumb img").getAttribute("data-src");
        console.log(img_1);

        let result = "";

        for(let i=0; i < list_newsPost.length; i++){
            let h3 = list_newsPost[i].querySelector(".assetText h3");
            if(h3){
            let title = list_newsPost[i].querySelector(".assetText h3").innerHTML;
            let img = list_newsPost[i].querySelector(".assetThumb img").getAttribute("data-src");

            result += "<div>"
            result +=       "<h3>" + title + "</h3>"
            result += "<img src=" + img +">"
            result += "</div>"
            }
        }

        let list = document.querySelector("#list");
        list.innerHTML = result;

        
        console.log("-----------------")
    }
}