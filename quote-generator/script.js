const loader = document.querySelector(".loader");

const newQuoteBtn = document.querySelector(".new-quote-btn");
const twitterBtn = document.querySelector(".twitter-btn");

const quote = document.querySelector(".quote");
const quoteText = document.querySelector(".quote__text");
const quoteAuthor = document.querySelector(".quote__author");

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

async function getQuote() {
  loading();

  try {
    const res = await fetch("http://127.0.0.1:3000/random");
    const data = await res.json();

    const { a: author, q: quote } = data[0];

    quoteText.textContent = quote;
    quoteAuthor.textContent = author;
  } catch (err) {
    quoteText.textContent = err.message;
    quoteAuthor.textContent = err.stack;
  } finally {
    complete();
  }
}

function complete() {
  loader.hidden = true;
  quote.hidden = false;
}

function loading() {
  loader.hidden = false;
  quote.hidden = true;
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
  window.open(twitterUrl, "_blank");
}

getQuote();
