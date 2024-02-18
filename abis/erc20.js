module.exports = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'src',
        type: 'address',
      },
      {
        indexed: true,
        name: 'dst',
        type: 'address',
      },
      {
        indexed: false,
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
];