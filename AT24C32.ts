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
     * @param dat is the Day will be set, eg: 0x57
     */
    //% blockId="DS1307_START" block="Set I2C Address %address"
    //% weight=52 blockGap=8
    //% address.min=1 address.max=31
    //% parts=DS1307 trackArgs=0
    export function setAddress(address : number) {
        AT24C32_ADDR=address
    }

} 