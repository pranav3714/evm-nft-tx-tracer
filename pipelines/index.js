const missingBlockPipeline = [
  {
    $group: {
      _id: null,
      minBlock: {
        $min: '$blockNumber',
      },
      maxBlock: {
        $max: '$blockNumber',
      },
      blockNumbers: {
        $push: '$blockNumber',
      },
    },
  },
  {
    $addFields: {
      fullSequence: {
        $range: [
          '$minBlock',
          {
            $add: ['$maxBlock', 1],
          },
        ],
      },
    },
  },
  {
    $addFields: {
      missingBlocks: {
        $setDifference: ['$fullSequence', '$blockNumbers'],
      },
    },
  },
];

module.exports = {
  missingBlockPipeline,
};
