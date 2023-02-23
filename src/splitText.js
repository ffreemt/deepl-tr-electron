function splitText (text, limit = null) {
  if (limit === null) limit = 3000
  const chunks = []
  const paragraphs = text.split(/[\n\r]+/)
  let currentChunk = paragraphs[0] + '\n'
  for (const paragraph of paragraphs.slice(1)) {
    if (currentChunk.length + paragraph.length <= limit) {
      // Add paragraph to current chunk
      currentChunk += paragraph + '\n'
    } else {
      // Save current chunk and start a new one with this paragraph
      chunks.push(currentChunk)
      currentChunk = paragraph + '\n'
    }
  }
  // Add the last chunk
  chunks.push(currentChunk)

  // remove extra \n and possible blank in the beginning
  return chunks.map(_ => _.trim()).filter(_ => _.trim())
}

module.exports = splitText
