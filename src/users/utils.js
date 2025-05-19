function generateValidationCode(){
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i=0; i < 6; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function isVerificationCodeValid(currentTimeIn, verificationTimeIn){
    const currentTime = new Date(currentTimeIn);
    const verificationTime = new Date(verificationTimeIn);
    const diffMs = Math.abs(verificationTime - currentTime);
    const diffHours = diffMs / (1000 * 60 * 60);
    if (diffHours > 1){
        return false;
    }
    else{
        return true;
    }
}


module.exports = { 
    generateValidationCode,
    isVerificationCodeValid,
};