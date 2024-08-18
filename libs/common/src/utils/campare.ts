export const compareCardNumbers = (cardNumber: string, maskedCardNumber: string) => {
    const cardArrayNumber = (maskedCardNumber.split(" ").join("")).split("*")
    const trimedCardNumber = cardNumber.split(" ").join("")
    let isMatch = true
    for(let part of cardArrayNumber) {
        console.log(part)
        if(!trimedCardNumber.includes(part)) {
            isMatch = false
        }
    }
 
    return isMatch
}