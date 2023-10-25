"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: Marjan JAfari
      Date:   2023-06-21

      Filename: Assignment2
*/
window.addEventListener("load", createLightbox);

function createLightbox() {
   //Lightbox Container
   let lightBox = document.getElementById("lightbox");

   //Parts of the lightbox
   let lbTitle = document.createElement("h1");
   let lbCounter = document.createElement("div");
   let lbPrev = document.createElement("div");
   let lbNext = document.createElement("div");
   let lbPlay = document.createElement("div");
   let lbImages = document.createElement("div");

    //Create h1 element for Favorites Title
    let favoritesTitle = document.createElement("h1");
    favoritesTitle.textContent = "Favorites Photos";
    document.body.appendChild(favoritesTitle);
 
    //Favorites Photos container
    let favoritesContainer = document.createElement("div");
    favoritesContainer.id = "favorites";
    document.body.appendChild(favoritesContainer);

   //Design the lightbox title
   lightBox.appendChild(lbTitle);
   lbTitle.id = "lbTitle";
   lbTitle.textContent=lightboxTitle;

   //Design the lightbox slide counter
   lightBox.appendChild(lbCounter);
   lbCounter.id = "lbCounter";
   let currentImg = 1;
   lbCounter.textContent=currentImg + " / " + imgCount;

   //Design the lightbox previous slide button
   lightBox.appendChild(lbPrev);
   lbPrev.id = "lbPrev";
   lbPrev.innerHTML="&#9664;";
   lbPrev.onclick = showPrev;

   //Design the next slide button
   lightBox.appendChild(lbNext);
   lbNext.id = "lbNext";
   lbNext.innerHTML="&#9654;";
   lbNext.onclick = showNext;

   //Design the Play-Pause button
   lightBox.appendChild(lbPlay);
   lbPlay.id = "lbPlay";
   lbPlay.innerHTML="&#9199;";
   let timeID;
   lbPlay.onclick = function() {
      if (timeID) {
      //Stop the slideshow
      window.clearInterval(timeID);
      timeID = undefined;
   } else {
      //Start the slideshow
      showNext();
      timeID=window.setInterval(showNext, 1500);
   }
}

   //Design the lightbox images container
   lightBox.appendChild(lbImages);
   lbImages.id = "lbImages";
   //Add images from the imgFiles array to the container
   for (let i = 0; i < imgCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createOverlay;
      lbImages.appendChild(image);
   }
   
   //Function to move forward through the image list
   function showNext() {
      lbImages.appendChild(lbImages.firstElementChild);
      (currentImg < imgCount) ? currentImg++ : currentImg = 1;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }

   //Function to move backward through the image list
   function showPrev(){
      lbImages.insertBefore(lbImages.lastElementChild,lbImages.firstElementChild);
      (currentImg > 1) ? currentImg-- : currentImg = imgCount;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }

   //Create Overlay
   function createOverlay() {
      let overlay = document.createElement("div");
      overlay.id = "lbOverlay";

      //Add the figure box to the overlay
      let figureBox = document.createElement("figure");
      overlay.appendChild(figureBox);

      //Add the image to the figure box
      let overlayImage = this.cloneNode("true");
      figureBox.appendChild(overlayImage);

      //Add the caption to the figure box
      let overlayCaption = document.createElement("figcaption");
      overlayCaption.textContent = this.alt;
      figureBox.appendChild(overlayCaption);

      //Add a close button to the overlay
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(overlay);
      }
      overlay.appendChild(closeBox);

     //add audio
     let overlayAudio = document.createElement("audio");
     overlayAudio.id = "lbAudio";
     
     //set some audio attributes
     overlayAudio.src = "assignment2.mp3"
     overlayAudio.type = "audio/mpeg";

     //append audio as child of overlay
          overlay.appendChild(overlayAudio);
          overlayAudio.play();

     document.body.appendChild(overlay);

     //Create Add to Favorites button
     let addButton = document.createElement("button");
    addButton.textContent = "Add to Favorites";
    
    //The addButton.onclick will be executed when Add to Favorites button is clicked
    addButton.onclick = function () {

      //Check image if it exist in Favorites
      let existingImages = favoritesContainer.getElementsByTagName("img");

   
      for (let i = 0; i < existingImages.length; i++) {
        if (existingImages[i].src === overlayImage.src) {
          alert("This image is already in favorites.");
          return;
        }
      }
      
      if (favoritesContainer.childElementCount >= 5) {
        alert("Maximum of 5 favorites reached. Please remove at least one favorite first.");
        return;
      }

      let favoriteImage = overlayImage.cloneNode(true);
      favoriteImage.style.width = "150px";
      favoriteImage.style.height = "150px";

    
      let favoriteItem = document.createElement("div");
      favoriteItem.appendChild(favoriteImage);
      favoritesContainer.appendChild(favoriteItem);

 
      let removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = function () {
        if (confirm("Do you want to remove this image from favorites?")) {
          favoritesContainer.removeChild(favoriteItem);
        }
      };
      removeButton.style.display = "none"; // This code will initially hide the "Remove" button
      favoriteItem.appendChild(removeButton);
    };

    overlay.appendChild(addButton);

    document.body.appendChild(overlay);


   }
  function showRemoveButton(event) {
   let clickedElement = event.target;

  
   if (clickedElement.tagName === "IMG" && clickedElement.parentNode.parentNode.id === "favorites") {
     let removeButtons = favoritesContainer.querySelectorAll("button");
     removeButtons.forEach(function (button) {
       button.style.display = "   ";
     });

     let selectedFavoriteItem = clickedElement.parentNode;
     let removeButton = selectedFavoriteItem.querySelector("button");
     removeButton.style.display = "block";
   }
 }
 favoritesContainer.addEventListener("click", showRemoveButton);
  
 let footer = document.createElement("footer");
 footer.innerHTML = "&copy;&nbsp;Copyright Marjan Jafari - 301321020 - Assignment 2";
 document.body.appendChild(footer);

}

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("gallery");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }
  
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "activeModal";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);
      
      let closeBox = document.createElement("div");
      closeBox.id = "modalClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }
      
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
    }
}