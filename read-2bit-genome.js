// The file begins with a 16-byte header containing the following fields:
// signature - the number 0x1A412743 in the architecture of the machine that created the file
const TWOBIT_GENOME_SIGNATURE = 0x1A412743
const TWOBIT_GENOME_SIGNATURE_NEW = 0x4327411A

// version - zero for now. Readers should abort if they see a version number higher than 0.
// sequenceCount - the number of sequences in the file.
// reserved - always zero for now



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