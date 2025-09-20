const Tesseract = require('tesseract.js');
exports.extractText = async (filePath) => {
  const result = await Tesseract.recognize(filePath, 'eng');
  return result.data.text;
};