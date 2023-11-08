let fileInput = document.getElementById("file-input");
let imageCardsContainer = document.getElementById("image-cards");
let numOfFiles = document.getElementById("num-of-files");
let imagesData = JSON.parse(localStorage.getItem("imagesData")) || [];

function saveToLocalStorage() {
  localStorage.setItem("imagesData", JSON.stringify(imagesData));
  console.log("Images data saved to local storage:", imagesData);
}

function loadImagesFromLocalStorage() {
  let savedImages = JSON.parse(localStorage.getItem("imagesData")) || [];
  savedImages.forEach((imageData) => {
    if (!imageData.caption) {
      imageData.caption = "";
    }
    createImageCard(imageData);
  });
}

function createImageCard(imageData) {
  let imageCard = document.createElement("div");
  imageCard.className = "image-card";

  let img = document.createElement("img");
  img.setAttribute("src", imageData.dataUrl);

  let captionInput = document.createElement("input");
  captionInput.type = "text";
  captionInput.placeholder = "Enter caption...";

  let appendButton = document.createElement("button");
  appendButton.innerText = "Append Caption";
  appendButton.addEventListener("click", function () {
    if (captionInput.value.trim() !== "") {
      imageData.caption = captionInput.value;
      saveToLocalStorage();
      let captionSpan = document.createElement("span");
      captionSpan.innerText = imageData.caption;
      imageCard.insertBefore(captionSpan, appendButton);
      saveToLocalStorage();
    }
  });
  if (imageData.caption) {
    captionInput.value = imageData.caption;
    let captionSpan = document.createElement("span");
    captionSpan.innerText = imageData.caption;
    imageCard.insertBefore(captionSpan, appendButton);
  }

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteImage(imageData.name);
    imageCard.remove(); 
  });

   imageCard.appendChild(img);
   imageCard.appendChild(captionInput);
   imageCard.appendChild(appendButton);
   imageCard.appendChild(deleteButton);
   imageCardsContainer.appendChild(imageCard);  
}

function preview() {
  numOfFiles.textContent = `${fileInput.files.length} File(s) Selected`;
  console.log("Files selected:", fileInput.files);
}

function uploadImage() {
  console.log("Uploading images...");
  for (let i of fileInput.files) {
    let reader = new FileReader();

    reader.onload = () => {
      imagesData.push({ name: i.name, dataUrl: reader.result, caption: "" });
      saveToLocalStorage();
      console.log("Image uploaded and saved:", i.name);
      createImageCard({ name: i.name, dataUrl: reader.result, caption: "" });
    };

    reader.readAsDataURL(i);
  }
  fileInput.value = "";
  console.log("File input cleared.");
}

function deleteImage(imageName) {
  // Find the index of the image in the imagesData array
  let index = imagesData.findIndex((image) => image.name === imageName);
  if (index !== -1) {
    // Remove the image data from the array
    imagesData.splice(index, 1);
    // Save the updated imagesData to local storage
    saveToLocalStorage();
    console.log("Image deleted:", imageName);
  } else {
    console.log("Image not found for deletion:", imageName);
  }
}
// Function to create flipbook from imagesData
function createFlipbook() {
    let flipbookContainer = document.getElementById("flipbook-container");

    // Clear existing content
    flipbookContainer.innerHTML = "";

    // Loop through imagesData and create flipbook pages
    imagesData.forEach((imageData) => {
        let flipbookPage = document.createElement("div");
        flipbookPage.className = "flipbook-page";

        let img = document.createElement("img");
        img.src = imageData.dataUrl;

        let caption = document.createElement("div");
        caption.className = "caption";
        caption.innerText = imageData.caption; // You can customize the caption style using CSS

        flipbookPage.appendChild(img);
        flipbookPage.appendChild(caption);
        flipbookContainer.appendChild(flipbookPage);
    });
}

// Call the function to create flipbook when imagesData is loaded
loadImagesFromLocalStorage();
createFlipbook();

