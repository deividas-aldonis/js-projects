import { config } from "./config.js";

const gallery = document.querySelector(".gallery");

const apiUrl = "https://api.pexels.com/v1/curated?page=13&per_page=15";
let morePhotosAvailable = true;

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = (photos) => {
  photos.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.url,
      target: "_blank",
    });

    const image = document.createElement("img");
    setAttributes(image, {
      src: photo.src.original,
      alt: photo.alt,
      title: photo.alt,
    });

    item.appendChild(image);
    gallery.appendChild(item);
  });
};

const getPhotos = async () => {
  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: config.ACCESS_KEY,
      },
    });
    const data = await res.json();
    displayPhotos(data.photos);

    if (!data.next_page) {
      morePhotosAvailable = false;
    }
  } catch (error) {
    // Catch error here
  }
};

getPhotos();
