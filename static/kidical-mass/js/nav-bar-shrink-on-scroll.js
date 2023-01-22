window.onload=kidicalOnLoad;
window.onscroll=kidicalOnScroll;
window.onresize=kidicalOnResize;

var currentMode;
menuCollapseWidth=813;

function greater(x,y){
  return x>y;
}
function lesserOrEqual(x,y){
  return x<=y;
}
function updateNavBar(){
  
  //TODO: move these height/transition styles into a class in css and just set classes
  //console.log("updateNavBar called");
  var windowWidth=window.innerWidth;
  if(windowWidth>menuCollapseWidth){
    
    if(currentMode==="narrow" || currentMode==="undefined"){
      
      //NOTE: switching to wide mode, change menu/socials display
      var menuElement=document.getElementById("menu");
      menuElement.style.display="inline-block";
      var socialsElement=document.getElementById("socials");
      socialsElement.style.display="inline-block";
    }
    
    var navBarElement=document.getElementById("nav_bar");
    if (document.body.scrollTop > 50.0 || 
      document.documentElement.scrollTop > 50.0) {

      navBarElement.style.height = "120px";
    }
    else {

      navBarElement.style.height = "200px";
    }
    navBarElement.offsetHeight;//NOTE: this triggers the change in height to be 
      //applied avoiding the transition on the change in height when the 
      //transition is re-applied.
    navBarElement.style.transition="height 1s ease-in-out";
    currentMode="wide";
  }
  else{
    
    if(currentMode==="wide" || currentMode==="undefined"){
      
      //NOTE: switching to wide narrow mode, change menu/socials display
      var menuElement=document.getElementById("menu");
      menuElement.style.display="none";
      var socialsElement=document.getElementById("socials");
      socialsElement.style.display="block";
    }
    
    var navBarElement=document.getElementById("nav_bar");
    navBarElement.style.transition="none";
    navBarElement.style.height = "auto";
    if(windowWidth>=475){
      
      //navBarElement.style.height = "auto";
    }
    else{
      
      //navBarElement.style.height = "230px";
    }
    currentMode="narrow";
  }
}
function updateDownButton(){
  
  //var navBarElement=document.getElementById("nav_bar");
  //var navBarHeight=navBarElement.offsetHeight;
  var windowHeight=window.innerHeight;
  var scrollTop=Math.max(document.body.scrollTop,document.documentElement.scrollTop);
  
  var heroImgElement=document.getElementById("header_img");
  var heroImgOffsetHeight=heroImgElement.offsetHeight;
  var heroImgOffsetTop=heroImgElement.offsetTop;
  
  var downButtonElement=document.getElementById("downButton");
  var downButtonOffsetHeight=downButtonElement.offsetHeight;
  //console.log("updateDownButton");
  //console.log("  scrollTop="+scrollTop);
  //console.log("  windowHeight="+windowHeight);
  //console.log("  heroImgOffsetHeight="+heroImgOffsetHeight);
  //console.log("  heroImgOffsetTop="+heroImgOffsetTop);
  //console.log("  downButtonOffsetHeight="+downButtonOffsetHeight);
  var bottomButton=Math.max(-scrollTop,
    windowHeight-heroImgOffsetTop-heroImgOffsetHeight);
  buttonBottomStr=bottomButton.toString()+"px";
  //console.log("  buttonBottomStr="+buttonBottomStr);
  
  //NOTE: it seems it isn't recommended to set possitions based on
  //  scrolling (see: https://blog.logrocket.com/use-scroll-linked-animations-right-way/)
  //  However, it works fine in the chrome+firefox browsers I tried and it isn't
  //  clear to me how much of an issue it will be in this case.
  //  I briefly looked from some CSS way to do this, but didn't find anything
  //  immediately obvious that was close enough.
  downButtonElement.style.bottom=buttonBottomStr;
  downButtonElement.style.display="block";
}
function onClickDownButton(){
  
  //console.log("onClickDownButton called");
  
  var windowWidth=window.innerWidth;
  
  //NOTE: don't want the current nav_bar height, but the final nav_bar height 
  //  after it has been shrunk, which is 120px, see above "updateNavBar" function
  var navBarOffsetHeight=120;
  
  var heroImgElement=document.getElementById("header_img");
  var heroImgOffsetHeight=heroImgElement.offsetHeight;
  var heroImgOffsetTop=heroImgElement.offsetTop;
  var scrollTop=heroImgOffsetHeight+heroImgOffsetTop-navBarOffsetHeight;
  
  if(windowWidth<menuCollapseWidth){
    
    var navBarElement=document.getElementById("nav_bar");
    var navBarOffsetHeight=navBarElement.offsetHeight;
    //console.log("  navBarOffsetHeight="+navBarOffsetHeight);
    //console.log("  heroImgOffsetHeight="+heroImgOffsetHeight);
    scrollTop=navBarOffsetHeight+heroImgOffsetHeight;
  }
  
  //console.log("  scrollTop="+scrollTop);
  
  document.body.scrollTop=scrollTop;
  document.documentElement.scrollTop=scrollTop;
}
function scrollFunction(){
  
  updateNavBar();
  updateDownButton();
}
function expandMobileMenu(){
  
  var menuElement=document.getElementById("menu");
  //console.log("menuElement.style.display="+menuElement.style.display);
  
  if(menuElement.style.display==="block"){
    
    menuElement.style.display="none";
  }
  else{
    
    menuElement.style.display="block";
  }
}
function updateDisplayOfRides(parentElement,comparitor){

  var today = new Date();
  const rides=parentElement.getElementsByClassName("ride");
  var numVisibleRides=0;
  for (let i = 0; i < rides.length; i++) {

    const rideDateStr=rides[i].getAttribute('ride_date');
    const rideDate=new Date(rideDateStr);
    const isUpcoming=comparitor(rideDate.getTime(),today.getTime());
    if(!isUpcoming){

      rides[i].style.display='none';
    }
    else{

      rides[i].style.display='block';
      ++numVisibleRides;
    }
  }
  return numVisibleRides
}
function setRideDisplayFromDate(){

  const upcomingRidesDiv=document.getElementsByClassName("upcoming-rides")[0];
  var numVisibleRides=updateDisplayOfRides(upcomingRidesDiv,greater);
  console.log("numVisibleRides="+numVisibleRides);
  var noUpcomingRidesMessageElement=document.getElementById("no-upcoming-rides-message");
  if(numVisibleRides==0){
    
    noUpcomingRidesMessageElement.style.display="block";
  }
  else{
    
    noUpcomingRidesMessageElement.style.display="none";
  }
  const pastRidesDiv=document.getElementsByClassName("past-rides")[0];
  updateDisplayOfRides(pastRidesDiv,lesserOrEqual);
}

function kidicalOnScroll(){
  
  scrollFunction();
}
function kidicalOnResize(){
  
  scrollFunction();
}
function kidicalOnLoad(){
  
  setRideDisplayFromDate();
  
  updateDownButton();
}
