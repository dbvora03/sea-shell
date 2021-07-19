
const tester = (req, res) => {
  const array = [
    {
      test1: 'test1value',
      test2: 'test2value',
      test3: 'test3value',
    },
    {
      test1: 'test1value',
      test2: 'test2value',
      test3: 'test3value',
    },
    {
      test1: 'test1value',
      test2: 'test2value',
      test3: 'test3value',
    },
  ];


  return res.status(200).json(array);
};


module.exports = tester;
