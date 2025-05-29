const text = "123 All visuals and music in this video are 100% crafted by talented human artists, without the use of AI. We’re committed to delivering genuine, hand-made creations";
//   for our audience to enjoy.
const words = text.match(/\S+|\s+/g).map((element) => element.replace(/ /g, "\u00A0"));
  
export { words };