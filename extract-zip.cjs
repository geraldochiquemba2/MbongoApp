const fs = require('fs');
const zlib = require('zlib');

const zipPath = 'attached_assets/temp.zip';
const buffer = fs.readFileSync(zipPath);

function readUInt16LE(buf, offset) {
  return buf[offset] | (buf[offset + 1] << 8);
}

function readUInt32LE(buf, offset) {
  return (buf[offset] | (buf[offset + 1] << 8) | (buf[offset + 2] << 16) | (buf[offset + 3] << 24)) >>> 0;
}

let offset = 0;

while (offset < buffer.length - 30) {
  const signature = readUInt32LE(buffer, offset);
  
  if (signature === 0x04034b50) {
    offset += 4;
    const version = readUInt16LE(buffer, offset);
    offset += 2;
    const flags = readUInt16LE(buffer, offset);
    offset += 2;
    const compression = readUInt16LE(buffer, offset);
    offset += 2;
    offset += 2; 
    offset += 2;
    offset += 4; 
    const compressedSize = readUInt32LE(buffer, offset);
    offset += 4;
    const uncompressedSize = readUInt32LE(buffer, offset);
    offset += 4;
    const fileNameLength = readUInt16LE(buffer, offset);
    offset += 2;
    const extraFieldLength = readUInt16LE(buffer, offset);
    offset += 2;
    
    const fileName = buffer.toString('utf8', offset, offset + fileNameLength);
    offset += fileNameLength;
    offset += extraFieldLength;
    
    if (fileName === 'Group 4.png') {
      console.log('Found:', fileName);
      console.log('Compression:', compression);
      console.log('Compressed size:', compressedSize);
      console.log('Uncompressed size:', uncompressedSize);
      
      const compressedData = buffer.slice(offset, offset + compressedSize);
      
      if (compression === 8) {
        const decompressed = zlib.inflateRawSync(compressedData);
        fs.writeFileSync('attached_assets/Group4.png', decompressed);
        console.log('Extracted to: attached_assets/Group4.png');
      } else if (compression === 0) {
        fs.writeFileSync('attached_assets/Group4.png', compressedData);
        console.log('Extracted to: attached_assets/Group4.png (no compression)');
      }
      break;
    }
    
    offset += compressedSize;
  } else {
    break;
  }
}
