var face_x=[]
var face_y=[]
var face_size=[]

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  // face_size = 400
  // face_x = width/2
  // face_y = height/2
  for(var i=0;i<10;i++){
    face_size[i] = random(100,400) //臉的大小100~400
    face_x[i] = random(0,width)
    face_y[i] = random(0,height)
  }
}

function draw() {
  background(220);
  textSize(50)
  text("X:"+mouseX+"  Y:"+mouseY,50,50)
  for(var j=0;j<10;j++){
    push()  
    // fill(255,0,0)
    translate(face_x[j],face_y[j]) //把(0,0)座標原點移到視窗的中間
    ellipse(0,0,face_size[j])  //臉
    ellipse(0,0,face_size[j]/2,face_size[j]/4) //鼻子橢圓
    ellipse(-face_size[j]/10,0,face_size[j]/12) //左鼻孔
    ellipse(face_size[j]/10,0,face_size[j]/12) //右鼻孔
    //左眼
    ellipse(-face_size[j]/5,-face_size[j]/5,face_size[j]/7)
    fill(0)
    ellipse(-face_size[j]/4.5+map(mouseX,0,width,-face_size[j]/40,face_size[j]/12),-face_size[j]/4.5+map(mouseY,0,height,-face_size[j]/40,face_size[j]/12),face_size[j]/20)
    noFill()
    //右眼
    ellipse(face_size[j]/5,-face_size[j]/5,face_size[j]/7)
    fill(0)
    ellipse(face_size[j]/5.8+map(mouseX,0,width,-face_size[j]/40,face_size[j]/12),-face_size[j]/4.5+map(mouseY,0,height,-face_size[j]/40,face_size[j]/12),face_size[j]/20)
    
    fill(255,0,0)
    arc(0,face_size[j]/4,face_size[j]/2,face_size[j]/4,0,180)  //下弧
    fill(255)
    if(mouseIsPressed)
    {   //mouseIsPressed為true，代表有按下滑鼠
      arc(0,face_size[j]/4-1,face_size[j]/2,face_size[j]/10,0,180)   //上弧
    }
    else
    {   //mouseIsPressed為false，代表沒有按下滑鼠
      arc(0,face_size[j]/4-1,face_size[j]/2,face_size[j]/4-10,0,180) //上弧
    }
    
    noFill()
  pop()
  }
  
}