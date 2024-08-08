import bcrypt from 'bcryptjs'

const generateHash = (value) => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value,salt);
}

export { generateHash } 