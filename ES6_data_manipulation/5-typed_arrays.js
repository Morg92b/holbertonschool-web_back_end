export default function createInt8TypedArray(length, position, value) {
    let buffer = new ArrayBuffer(length);
    let Int8 = new Int8Array(buffer);

    if (position < length) {
        Int8[position] = value;
    }
    else {
       throw new Error("Position outside range")
    }
    return buffer;
}