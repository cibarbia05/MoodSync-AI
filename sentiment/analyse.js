import Sentiment from 'sentiment'

/**
 * Utilizes Node.js Sentiment Analysis module to compute the sentiment of the
 * text input by the user
 * @param text
 * @returns {boolean} true if the text sentiment is positive, false otherwise
 */
const getTextSentiment = (text) => {
  const sentiment = new Sentiment()
  const score = sentiment.analyze(text).score
  return score >= 0;
};

export default getTextSentiment
