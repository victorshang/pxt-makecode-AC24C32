/**
* makecode AT24C32 Package.
*/

/**
 * AT24C32 block
 */
//% weight=20 color=#785AC8 icon="\uf018" block="AT24C32"
namespace AT24C32 {
    let AT24C32_ADDR = 0x57

    /**
     * Set AT24C32 I2C Address
     * @param i2c_address of AT24C32 I2C, eg: 87
     */
    //% blockId="AT24C32_setAddress" block="Set AT24C32 I2C Address %address"
    //% address.min=0 address.max=127
    //% parts=AT24C32 trackArgs=0
    export function setAddress(i2c_address: number) {
        AT24C32_ADDR = i2c_address
    }

    /**
     * Write a Byte to AT24c32
     * @param data byte of data , eg: 64
     * @param eepromAddr of memory address , eg: 0
     */
    //% blockId="AT24C32_WriteByte" block="Write Byte %data to %eepromAddr"
    //% eepromAddr.min=0 eepromAddr.max=32767
    //% parts=AT24C32 trackArgs=0
    export function writeAT24c32Byte(data: number, eepromAddr: number) {
        data = data & 0xff
        let buf = pins.createBuffer(3)
        buf[0] = eepromAddr >> 8    // msb
        buf[1] = eepromAddr & 0xff  // lsb
        buf[2] = data
        pins.i2cWriteBuffer(AT24C32_ADDR, buf, false)
    }
   
    /**
     * Write a char to AT24c32
     * @param char char of data , eg: "H"
     * @param eepromAddr address of memory , eg: 0
     */
    //% blockId="AT24C32_WriteChar" block="Write Char %char to %eepromAddr"
    //% eepromAddr.min=0 eepromAddr.max=32767
    //% parts=AT24C32 trackArgs=0
    export function writeAT24c32Char(char: string, eepromAddr: number) {
        let buf = pins.createBuffer(3)
        buf[0] = eepromAddr >> 8    // msb
        buf[1] = eepromAddr & 0xff  // lsb
        buf[2] = char.charCodeAt(0)
        pins.i2cWriteBuffer(AT24C32_ADDR, buf, false)
    }
    
    /**
     * Write String to AT24c32
     * @param str String of data  , eg: "Hello"
     * @param eepromAddr of memory address , eg: 0
     */
    //% blockId="AT24C32_WriteString" block="Write String %str to %eepromAddr"
    //% eepromAddr.min=0 eepromAddr.max=32767
    //% parts=AT24C32 trackArgs=0
    export function writeAT24c32String(str: string, eepromAddr: number) {
        let buf = pins.createBuffer(str.length + 2)
        buf[0] = eepromAddr >> 8    // msb
        buf[1] = eepromAddr & 0xff  // lsb
        for (let index = 2; index < str.length + 2; index++) {
            buf[index] = str.charCodeAt(index - 2)
        }
        pins.i2cWriteBuffer(AT24C32_ADDR, buf, false)
    }
    /**
     * Read a Byte from AT24c32
     * @param eepromAddr of memory address , eg: 0
    */
    //% blockId="AT24C32_ReadByte" block="Read a Byte from %eepromAddr"
    //% eepromAddr.min=0 eepromAddr.max=32767
    //% parts=AT24C32 trackArgs=0
    export function readAT24C32Byte(eepromAddr: number): number {
        let buf = pins.createBuffer(2)
        buf[0] = eepromAddr >> 8    // msb
        buf[1] = eepromAddr & 0xff  // lsb
        pins.i2cWriteBuffer(AT24C32_ADDR, buf)
        return pins.i2cReadNumber(AT24C32_ADDR, NumberFormat.UInt8LE, false)
    }

    /**
     * Read a Char from AT24c32
     * @param eepromAddr of memory address , eg: 0
    */
    //% blockId="AT24C32_ReadChar" block="Read a Char from %eepromAddr"
    //% eepromAddr.min=0 eepromAddr.max=32767
    //% parts=AT24C32 trackArgs=0
    export function readAT24C32Char(eepromAddr: number): string {
        let buf = pins.createBuffer(2)
        buf[0] = eepromAddr >> 8    // msb
        buf[1] = eepromAddr & 0xff  // lsb
        pins.i2cWriteBuffer(AT24C32_ADDR, buf)
        return String.fromCharCode(pins.i2cReadNumber(AT24C32_ADDR, NumberFormat.UInt8LE, false))
    }
    /**
     * Read String from AT24c32
     * @param eepromAddr of memory address , eg: 0
     * @param len String length  , eg: 5
     */
    //% blockId="AT24C32_ReadString" block="Read String of length  %len from %eepromAddr"
    //% eepromAddr.min=0 eepromAddr.max=32767
    //% parts=AT24C32 trackArgs=0
    export function readAT24C32String(len: number, eepromAddr: number): string {
        let buf = pins.createBuffer(2)
        buf[0] = eepromAddr >> 8    // msb
        buf[1] = eepromAddr & 0xff  // lsb
        pins.i2cWriteBuffer(AT24C32_ADDR, buf)
        let strbuff = ""
        for (let index = 0; index < len; index++) {
            strbuff += String.fromCharCode(pins.i2cReadNumber(AT24C32_ADDR, NumberFormat.UInt8LE, false))
        }
        return strbuff
    }
} 