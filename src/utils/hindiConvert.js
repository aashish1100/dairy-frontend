

export async function toHindi(text) {
  if (!text) return "";

  try {
    const response = await fetch(
      `https://inputtools.google.com/request?text=${text}&itc=hi-t-i0-und&num=1`
    );

    const data = await response.json();

    if (data[0] === "SUCCESS") {
      return data[1][0][1][0];
    }

    return text; // fallback
  } catch (err) {
    console.log("Hindi conversion error:", err);
    return text;
  }

}
