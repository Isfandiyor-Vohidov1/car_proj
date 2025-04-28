import otp from 'otp-generator';

export const otpGenerator = () => {
    return otp.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })
}
