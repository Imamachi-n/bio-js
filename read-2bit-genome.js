// import fs from 'fs';
const fs = require('fs')

const hg38_filepath = '/Users/imamachinaoto/Desktop/hg38.2bit';
// The file begins with a 16-byte header containing the following fields:
// signature - the number 0x1A412743 in the architecture of the machine that created the file
const TWOBIT_GENOME_SIGNATURE = 0x1A412743;
let byteswapped = false;

// callback(err: NodeJS.ErrnoException, data: Buffer): void
fs.readFile(hg38_filepath, (err, data) => {
  // Error handling
  if (err) {
    throw err;
  }

  // Get byteswapped, sequenceCount
  [byteswapped, sequenceCount] = getHeader(data);
  console.log(byteswapped);
  console.log(sequenceCount);
});

/**
 * Get 16-byte header containing the following fields:
 * 1. signature - the number 0x1A412743 in the architecture of the machine that created the file
 * 2. version - zero for now. Readers should abort if they see a version number higher than 0
 * 3. sequenceCount - the number of sequences in the file
 * 4. reserved - always zero for now
 * @param {Buffer} data is a 2bit genome file
 * @returns {Array(boolean, number)} byteswapped, sequenceCount
 */
function getHeader(data) {
  // Get twobit genome signature
  let header = data.slice(0, 16);
  console.log(header);

  // Check little endian or big endian
  if (header.readUInt32LE(0, 4) === TWOBIT_GENOME_SIGNATURE) {
    // If header is little endian
    byteswapped = true;
    console.log("This file is LE");
  } else if (header.readUInt32BE(0, 4) === TWOBIT_GENOME_SIGNATURE) {
    // If header is big endian
    byteswapped = false;
    console.log("This file is BE");
  } else {
    throw new Error('Not a .2bit file.\n' + 'File Signature: ' + header + " not " + TWOBIT_GENOME_SIGNATURE);
  }

  // version - zero for now. Readers should abort if they see a version number higher than 0.
  if (header.readUInt32LE(4 * 1, 4 * 2) !== 0x00000000) {
    throw Error('File version in header should be 0.');
  } else {
    console.log('Version: OK!');
  }

  // sequenceCount - the number of sequences in the file.
  let sequenceCount = header.slice(4 * 2, 4 * 3).readUIntBE(0, 4);
  console.log(sequenceCount);

  // reserved - always zero for now
  if (header.readUInt32LE(4 * 3, 4 * 4) !== 0x00000000) {
    throw Error('Reserved field in header should be 0');
  } else {
    console.log('Reversed: OK!');
  }
  return [byteswapped, sequenceCount];
}

const buf = Buffer.from([0xc7, 0x01, 0x00, 0x00]);
console.log(buf.readUIntBE(0, 4));
// let headerUint8 = new Uint8Array(header);


const twoBit = ['T', 'C', 'A', 'G']
// byteTo4Bases is an array of byteValue -> 'ACTG'
// 0 to 255 (2^8, 8bit), 2bitで1bp分の情報
const byteTo4Bases = [...Array(256).keys()].map(
  (x, i) =>
  twoBit[(i >> 6) & 3] +
  twoBit[(i >> 4) & 3] +
  twoBit[(i >> 2) & 3] +
  twoBit[i & 3],
)