// Find the size of the image uploaded to Storyblok

const getImageDimensionsFromUrl = (imageUrl:string) => {
  const regex = /\/(\d+)x(\d+)\//; // Matches dimensions in the format "/widthxheight/"

  const match = imageUrl.match(regex);

  if (match && match.length === 3) {
    const width = parseInt(match[1]);
    const height = parseInt(match[2]);
    return { width, height };
  } else {
    console.log('Image dimensions not found in URL -- ', imageUrl);
    return { width: 0, height: 0 };
  }
  };
  
  export default getImageDimensionsFromUrl;