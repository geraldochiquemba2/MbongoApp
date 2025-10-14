const fs = require('fs');
const path = require('path');

const zipPath = 'attached_assets/Group 4_1760481256389.zip';
const buffer = fs.readFileSync(zipPath);

let offset = 0;

function readUInt16LE(buf, offset) {
  return buf[offset] | (buf[offset + 1] << 8);
}

function readUInt32LE(buf, offset) {
  return (buf[offset] | (buf[offset + 1] << 8) | (buf[offset + 2] << 16) | (buf[offset + 3] << 24)) >>> 0;
}

while (offset < buffer.length - 4) {
  const signature = readUInt32LE(buffer, offset);
  
  if (signature === 0x04034b50) {
    offset += 4;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    offset += 2;
    const compressedSize = readUInt32LE(buffer, offset);
    offset += 4;
    offset += 4;
    const fileNameLength = readUInt16LE(buffer, offset);
    offset += 2;
    const extraFieldLength = readUInt16LE(buffer, offset);
    offset += 2;
    
    const fileName = buffer.toString('utf8', offset, offset + fileNameLength);
    offset += fileNameLength;
    offset += extraFieldLength;
    
    console.log('Found file:', fileName, '(compressed size:', compressedSize, 'bytes)');
    offset += compressedSize;
  } else {
    offset++;
  }
}
