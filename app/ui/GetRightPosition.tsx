// Get Intro Right Position
function GetRightPosition(selector: any) {
  if (!selector) return 0;
  const introObj = selector.getBoundingClientRect();
  const introRight = Math.floor(window.innerWidth - introObj.right);
  return introRight;
}

export default GetRightPosition;
