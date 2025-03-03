export default function Hash(){
    const elements = "qwertyuioplkjhgfdsazxcvbnm0987651234";
    let hash = "";
    for (let i = 0; i < 10; i++) {
        hash += elements[Math.floor(Math.random() * elements.length)];
    }
    return hash;
}