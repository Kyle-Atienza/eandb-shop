const sliceArrayEveryN = (arr: any[], n: number, startIndex: number) => {
  let result = [];
  for (var i = startIndex; i < arr.length; i += n) {
    result.push(arr[i]);
  }
  return result;
};

export { sliceArrayEveryN };
