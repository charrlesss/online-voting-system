const generateCode = () => {
    let code = "";
    while (code.length < 5) {
      const randomNumber:number = Math.floor(Math.random() * 9);
      if (code.indexOf(randomNumber.toString()) === -1) {
        code = code + randomNumber;
      }
    }
    const genCode = code;
    return genCode;
  };
export default generateCode;
  