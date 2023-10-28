import bcrypt from 'bcryptjs';

export const hashPassword = (pwd) => {

    return bcrypt.hashSync(pwd);
}

export const comparePassword = (pwd, hashedPwd) => {
    return bcrypt.compareSync(pwd, hashedPwd)
}