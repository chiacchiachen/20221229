
// var face_x,face_y,face_size
var face_x = [] 
var face_y = []
var face_size = []
var face_num = 10
var song
var songIsplay=false  //設定此變數為"假"(false)，收到按下滑鼠把變數改為"true"，音樂開始播放。
var amp
var vol=0
var m_x,m_y
var music_btn,mouse_btn,Speech_btn,camera_btn
var mosueIsplay=true
var myRec = new p5.SpeechRec();
var result
var drawface
var colors = "809bce-95b8d1-b8e0d2-d6eadf-eac4d5".split("-").map(a => "#" + a)
var colors_r = "d3f8e2-e4c1f9-f694c1-ede7b1".split("-").map(a => "#" + a)
var clr, clr_r
// 宣告陣列資料
var positionListX = []
var positionListY = []
var clrList = []
var clr_r_List = []
var sizeList = []

//================手指辨識======================
let handpose;
let video;
let predictions =[] ;
let pointerX,pointerY,pointerZ;
let pointerX8, pointerY8, pointerZ8, pointerX4, pointerY4, d //後面變數名稱有8代表食指最上端，4代表大拇指的最上端，大寫的X、Y、Z手指所在的座標，d代表為4與8點的距離(只有取X)
let pointerX14, pointerY14, pointerX16, pointerY16 //用四個變數紀錄第14點(pointerX14,pointerY14)，16點的X、Y(pointerX16,pointerY16)
let p_image
//===============================================

function preload(){
  song=loadSound("Rain Drops - TrackTribe.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  // face_size = 400
  // face_x = width/2
  // face_y = height/2
  
	for (var j = 0; j < 10; j++) { //從j=0開始(第1朵花)...j=9(第10朵花)

		//紀錄資料
		positionListX.push(random(width))
		positionListY.push(random(height))
		clrList.push(colors[int(random(colors.length))])
		clr_r_List.push(colors_r[int(random(colors_r.length))])
		sizeList.push(random(0.2, 0.5))


		//畫圖
		push()
		translate(positionListX[j], positionListY[j]) //花的座標，原點移到視窗的中心點
		// 原本(random(width),random(height))換成(positionListX[j],positionListY[j])
		clr = clrList[j]
		// 原本colors[int(random(colors.length))]換成clrList[j]
		clr_r = clr_r_List[j]
		// 原本colors_r[int(random(colors_r.length))]換成clr_r_List[j]
		drawFlower(clr, clr_r, sizeList[j])
		// 原本size(random(0.5,1.5)換成sizeList[j]

		pop()
    

  //第一個按鈕
  music_btn = createButton("播放音樂")
    music_btn.position(10,10)
    music_btn.size(250, 100);
    music_btn.style('background-color', '#e3d5ca');
    music_btn.style('font-size', '30px');
    music_btn.style('color', 'black');
    music_btn.mousePressed(music_btn_pressed)
    
  //第二個按鈕
    mouse_btn = createButton("暫停音樂")
    mouse_btn.position(300,10)
    mouse_btn.size(300, 100);
    mouse_btn.style('background-color', '#d6ccc2');
    mouse_btn.style('font-size', '30px');
    mouse_btn.style('color', 'black');
    mouse_btn.mousePressed(mouse_btn_pressed)

  //第三個按鈕
    Speech_btn = createButton("語音辨識")
    Speech_btn.position(650,10)
    Speech_btn.size(300, 100);
    Speech_btn.style('background-color', '#d5bdaf');
    Speech_btn.style('font-size', '30px');
    Speech_btn.style('color', 'black');
    Speech_btn.mousePressed(Speech_btn_pressed)

    //第四個按鈕
    camera_btn = createButton("相機")
    camera_btn.position(980,10)
    camera_btn.size(300, 100);
    camera_btn.style('background-color', '#ddbea9');
    camera_btn.style('font-size', '30px');
    camera_btn.style('color', 'black');
    camera_btn.mousePressed(camera_btn_pressed)

  for(var i=0;i<face_num;i++){
    face_size[i] = random(100,300)  //臉的大小100~400
    face_x[i] = random(100,width)
    face_y[i] = random(100,height)
  }
  //----------------取得攝影機並---------------------------------	
	video = createCapture(VIDEO); //取得攝影機的影像，影像的畫面存到video
	video.size(width, height); //影像的大小為整個視窗的大小
  p_image = loadImage('ppp.png')

	handpose = ml5.handpose(video, modelReady); //把video影像執行手辨識，執行辨識完後會去執行modelReady function

	// This sets up an event that fills the global variable "predictions"
	// with an array every time new hand poses are detected
	handpose.on("predict", (results) => {
		predictions = results; //手勢辨識後的結果放到predictions變數內
	});

	// Hide the video element, and just show the canvas
	video.hide(); //隱藏video
}
}

function modelReady() {
	console.log("Model ready!");
}

//第一個
function music_btn_pressed(){
  song.play()
  songIsplay = true
  amp=new p5.Amplitude()
  music_btn.style('background-color','#284b63') //e3d5ca
  mouse_btn.style('background-color','#d6ccc2')
  Speech_btn.style('background-color','#d5bdaf')
  camera_btn.style('background-color','#ddbea9')
}

//第二個
function mouse_btn_pressed(){
  song.pause()
  songIsplay = false
  music_btn.style('background-color','#e3d5ca')
  mouse_btn.style('background-color','#e07a5f') //d6ccc2
  Speech_btn.style('background-color','#d5bdaf')
  camera_btn.style('background-color','#ddbea9')
}

//第三個
function Speech_btn_pressed(){
  music_btn.style('background-color','#e3d5ca')
  mouse_btn.style('background-color','#d6ccc2')
  Speech_btn.style('background-color','#95d5b2') //d5bdaf
  camera_btn.style('background-color','#ddbea9')
  myRec.onResult = showResult;
  myRec.start();
}

//第四個
function camera_btn_pressed(){
  music_btn.style('background-color','#e3d5ca')
  mouse_btn.style('background-color','#d6ccc2')
  Speech_btn.style('background-color','#d5bdaf')
  camera_btn.style('background-color','#a5a58d') //ddbea9
}

function showResult()
{
	if(myRec.resultValue==true) {
	     result = myRec.resultString
         if(myRec.resultString==="播音樂")
            {
                music_btn_pressed()
             }
         if(myRec.resultString==="不要播")
            {
 
              mouse_btn_pressed()
             }
        if(myRec.resultString==="相機")
             {
  
               camera_btn_pressed()
              }
	}
}

function draw() {
  background("#bfc8d7");
  image(video, 0, 0, width, height)
	 d= dist(pointerX8,pointerY8,pointerX4,pointerY4)
	for (var j = 0; j < positionListX.length; j++) { //從j=0開始(第1朵花)...j=9(第10朵花)
    r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionListX[j],positionListY[j])
	}
  drawKeypoints();
// //===========影像轉向==================================
  translate(width, 0);
  scale(-1, 1);
	//===========================
	background(255); //執行此指令，不暫留軌跡
    image(video, 0, 0, width, height);
  drawKeypoints(); //畫點，取得手指位置
  d= dist(pointerX8,pointerY8,pointerX4,pointerY4)
// //=====================================================

//===============畫圖===================================
  for(var j=0;j<face_num;j++){
    push()  
      fill(255)
      var f_s = face_size[j]
      translate(face_x[j],face_y[j]) //把(0,0)座標原點移到視窗的中間
      ellipse(0,0,f_s,f_s/1.3)  //臉的圓
      noFill()
        beginShape()
        strokeWeight(3)
        // line(-f_s/15,-f_s/5,f_s/15,-f_s/5) /眉毛
        // line(-f_s/4,-f_s/15,f_s/4,-f_s/15)
        endShape()
      strokeWeight(1)
      fill("#eacacb")
      ellipse(-f_s/3,-f_s/50,f_s/10) //左臉頰
      fill("#67421d")
      ellipse(-f_s/4.5+map(mouseX,0,width,-f_s/85,f_s/12),-f_s/8+map(mouseX,0,width,-f_s/85,f_s/12),f_s/12)//左眼珠
      noFill()
      fill("#eacacb")
      ellipse(f_s/3,-f_s/50,f_s/10) //右臉頰
      fill("#67421d")
      ellipse(f_s/4.5+map(mouseX,0,width,-f_s/85,f_s/12),-f_s/8+map(mouseX,0,width,-f_s/85,f_s/12),f_s/12)// 右眼珠
      fill(255,255,0)
      ellipse(-f_s/30,-f_s/15,f_s/13) //mouse
      ellipse(-f_s/30,-f_s/80,f_s/18)
      // fill("#cb8a90") //嘴巴裡的顏色
      // arc(0,f_s/4,f_s/2,f_s/4,0,180)  //下弧
      // fill("#f0e4d4")
      //+map(mouseX,0,width,-f_s/80,f_s/12)//眼睛會動
//=================================================================================

      if(!songIsplay){
        fill("#eacacb")
        ellipse(-f_s/3,-f_s/50,f_s/10) //沒有播放
        ellipse(f_s/3,-f_s/50,f_s/10)
      }
      else{
        if(!songIsplay){
          fill("#b1d3c5")
          ellipse(-f_s/3,-f_s/50,f_s/10) //沒有播放
          ellipse(f_s/3,-f_s/50,f_s/10)
        }
      else{
          vol = amp.getLevel() //取得聲音值(值為0~1之間)
          console.log(vol)
          fill("#b1d3c5")
          ellipse(-f_s/3,-f_s/50,f_s/10) //沒有播放
          ellipse(f_s/3,-f_s/50,f_s/10)
        } //音樂開始播
      }
    
      noFill()
    pop()

  push()
    textSize(50)
    fill(255,0,0)  
    text(result,1100,100);   
  pop()
    
  }

function drawKeypoints(){
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
//     // noStroke();
      if (j == 8) {                 //圖片出來的位置,食指				
        pointerX8 = map(keypoint[0],0,640,0,width)  //點的X軸座標
        pointerY8 = map(keypoint[1],0,480,0,height) //點的Y軸座標
        pointerZ8 = keypoint[2] //keypoint[2]代表Z(食指座標)
        console.log(pointerZ8)
        ellipse(pointerX8, pointerY8, 30, 30) //食指圓點顯示
      } else
      if (j == 4){
      fill(255,0,0)
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
        ellipse(pointerX4, pointerY4, 30, 30) //大拇指圓點顯示
      }else
      if (j == 14){
        pointerX14 = keypoint[0];
        pointerY14 = keypoint[1];
      }else
      if (j == 16){
        pointerX16 = keypoint[0];
        pointerY16 = keypoint[1];
      }
  }
}
}
}

function drawFlower(clr, clr_r, size = 1) { //clr:花瓣顏色，clr_r:花圓心顏色，size:
  push()
  // fill(255,211,33)
  scale(size) //縮放，size=1，100%顯示，0.5，50%顯示
  fill(clr_r)
  ellipse(0, 0, 50)
  ellipseMode(CORNER)
  // fill(255,90,61)
  fill(clr)
  for (var i = 0; i < 16; i++) {
    // rect(30, -20, 100 , 30)    
    ellipse(30, -20, 100, 30);
    line(50, -5, 110, -5)
    rotate(PI / 8)
  }
  pop()
}

function mousePressed() {
	positionListX.push(mouseX)
	positionListY.push(mouseY)
	clrList.push(colors[int(random(colors.length))])
	clr_r_List.push(colors_r[int(random(colors_r.length))])
	sizeList.push(random(0.2, 0.5))
	let data_length = positionListX.length

	push()
	translate(positionListX[data_length - 1], positionListY[data_length - 1]) //花的座標，原點移到視窗的中心點
	// 原本(random(width),random(height))換成(positionListX[j],positionListY[j])
	clr = clrList[data_length - 1]
	// 原本colors[int(random(colors.length))]換成clrList[j]
	clr_r = clr_r_List[data_length - 1]
	// 原本colors_r[int(random(colors_r.length))]換成clr_r_List[j]
	drawFlower(clr, clr_r, sizeList[data_length - 1])
	// 原本size(random(0.5,1.5)換成sizeList[j]

	pop()
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      // noStroke();
      if (j == 8) {		//食指的上端		
				pointerX8 = map(keypoint[0],0,640,0,width) //J=8 所以取的第8點的資訊，
				pointerY8 = map(keypoint[1],0,480,0,height) // keypoint[1]代表y
				console.log(pointerZ8)
        // pointerZ8 = map(keypoint[2],0,480,0,height //keypoint[2]
				
        if(pointerZ8<-40)
        {
          R_draw(pointerX8,pointerY8)
        }
				ellipse(pointerX8, pointerY8, 30, 30); //畫食指圓圈
      } else
      if (j == 4) {   //大拇指的上端
		fill(255,0,0)
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
				// pointerZ = keypoint[2]
				// print(pointerZ)
        ellipse(pointerX4, pointerY4, 30, 30); //畫大拇指圓圈
		 
      } else
      if (j == 14) {     //無名指的第三個關節
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 16) {     //無名指上端
        pointerX16 = keypoint[0];
        pointerY16 =  keypoint[1];
      }
			
    }
  
  }
}

function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
	push()
		translate(F_x,F_y);
	if(pointerY14<pointerY16){  //
		drawFlower(F_clr,F_clr_r,map(d,0,600,F_size,F_size+1))
	}else
	{
		//無名指沒有彎曲，張開無名指，花作旋轉
		rotate(frameCount/20)
		drawFlower(F_clr,F_clr_r,F_size)
			
	}
	pop()
}

function R_draw(handX,handY)
{
  positionListX.push(mouseX) //把花X位置存入到positionListX list資料內
  positionListY.push(mouseY) //把花Y位置存入到positionListY list資料內
  clrList.push(colors[int(random(colors.length))])
  clr_rList.push(colors_r[int(random(colors_r.length))]) //花圓心顏色放到list
  sizeList.push(random(0.5,1.5))
  let data_total = positionListX.length //目前資料筆數
  push()
    translate(positionListX[data_total-1],positionListY[data_total-1])
    drawFlower(clrList[data_total-1], clr_rList[data_total-1], sizeList[data_total-1]) 
  pop() 

}

// function drawface(){
//   for(var j=0;j<face_num;j++){
//     push()  
//       fill(255)
//       var f_s = face_size[j]
//       translate(face_x[j],face_y[j]) //把(0,0)座標原點移到視窗的中間
//       ellipse(0,0,f_s,f_s/1.3)  //臉的圓
//       noFill()
//         beginShape()
//         strokeWeight(3)
//         // line(-f_s/15,-f_s/5,f_s/15,-f_s/5) /眉毛
//         // line(-f_s/4,-f_s/15,f_s/4,-f_s/15)
//         endShape()
//       strokeWeight(1)
//       fill("#eacacb")
//       ellipse(-f_s/3,-f_s/50,f_s/10) //左臉頰
//       fill("#67421d")
//       ellipse(-f_s/4.5+map(mouseX,0,width,-f_s/85,f_s/12),-f_s/8+map(mouseX,0,width,-f_s/85,f_s/12),f_s/12)//左眼珠
//       noFill()
//       fill("#eacacb")
//       ellipse(f_s/3,-f_s/50,f_s/10) //右臉頰
//       fill("#67421d")
//       ellipse(f_s/4.5+map(mouseX,0,width,-f_s/85,f_s/12),-f_s/8+map(mouseX,0,width,-f_s/85,f_s/12),f_s/12)// 右眼珠
//       fill(255,255,0)
//       ellipse(-f_s/30,-f_s/15,f_s/13) //mouse
//       ellipse(-f_s/30,-f_s/80,f_s/18)
// }
// }
// function d_face(F_clr,F_clr_r,F_size,F_x,F_y){
// 	push()
// 		translate(F_x,F_y);
// 	if(pointerY14<pointerY16){
// 		drawface(F_clr,F_clr_r,map(d,0,600,F_size,F_size+1))
// 	}else
// 	{
// 		rotate(frameCount/20)
// 		drawface(F_clr,F_clr_r,F_size)
			
// 	}
// 	pop()
// }
// function mousePressed()  //按下滑鼠播音樂，再按一下停止音樂
// {
//   if(!songIsplay){
//     song.play()
//     songIsplay = true
//     amp=new p5.Amplitude()

//   }
//   else{
//     song.pause()
//     songIsplay = false

//   }
  
// 