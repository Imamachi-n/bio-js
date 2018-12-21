# /usr/bin/env python
from array import array

# 2bitのヒトゲノムデータ（バイナリファイル）を読み込む
import_2bit_genome_file = open("/Users/imamachinaoto/Desktop/hg38.2bit", 'rb')


def true_long_type():
    """
    OS X uses an 8-byte long, so make sure L (long) is the right size
    and switch to I (int) if needed
    """
    for type_ in ['L', 'I']:
        test_array = array(type_, [0])
        long_size = test_array.itemsize
        if long_size == 4:
            return type_
    raise ImportError("Couldn't determine a valid 4-byte long type to use \
as equivalent to LONG")


LONG = true_long_type()

header = array(LONG)
header.fromfile(import_2bit_genome_file, 4)

byteswapped = False
(signature, version, sequence_length, reversed) = header

if not signature == 0x1A412743:
    byteswapped = True
