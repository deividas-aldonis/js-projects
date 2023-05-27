import { config } from "./config.js";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

let page = 1;
let imagesToFetch = 5;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const imageLoaded = () => {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    imagesToFetch = 15;
    loader.hidden = true;
  }
};

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = (photos) => {
  imagesLoaded = 0;
  totalImages = photos.length;

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

    image.addEventListener("load", imageLoaded);

    item.appendChild(image);
    gallery.appendChild(item);
  });
};

const getPhotos = async () => {
  const apiUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=${imagesToFetch}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: config.ACCESS_KEY,
      },
    });

    const data = await res.json();

    if (data.next_page) {
      page++;
    }

    displayPhotos(data.photos);
  } catch (error) {
    // Catch error here
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
