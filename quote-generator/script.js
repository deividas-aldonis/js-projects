const newQuoteBtn = document.querySelector(".new-quote-btn");
const quoteText = document.querySelector(".quote__text");
const quoteAuthor = document.querySelector(".quote__author");

newQuoteBtn.addEventListener("click", getQuote);

async function getQuote() {
  // proxy to fix CORS issues
  const res = await fetch("http://127.0.0.1:3000/random");
  const data = await res.json();

  const { a: author, q: quote } = data[0];

  quoteText.textContent = quote;
  quoteAuthor.textContent = author;
}

// get the first quote
getQuote();
