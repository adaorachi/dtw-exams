export const apiCall = result => {
  const array = [];
  const subjArray = {};
  const subjAnswers = {};

  result.forEach(res => {
    array.push({ subject: res.data.subject, questions: res.data.data });
    const bb = {};
    // eslint-disable-next-line array-callback-return
    res.data.data.map(r => {
      bb[r.id] = '';
    });
    subjArray[res.data.subject] = 1;
    subjAnswers[res.data.subject] = bb;
  });

  return { array, subjArray, subjAnswers };
};

export const examReviewCall = data => {
  const subjArray = {};

  data.forEach(res => {
    subjArray[res.subject] = 1;
  });

  return { subjArray };
};
