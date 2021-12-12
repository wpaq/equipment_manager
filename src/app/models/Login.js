import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define('Login', {
        name: {
            type: DataTypes.STRING,
            defaultValue: '',
            validate: {
                len: {
                    args: [3, 255],
                    msg: 'Campo deve ter entre 3 e 255 caracteres'
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: '',
            unique: {
                msg: 'Email já existe',
            },
            validate: {
                idEmail: {
                    msg: 'Email inválido',
                },
            },
        },
        password_hash: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        password: {
            type: DataTypes.VIRTUAL,
            defaultValue: '',
            validate: {
              len: {
                args: [6, 50],
                msg: 'A senha precisa ter entre 6 e 50 caracteres',
              },
            },
        },
    },
    {
        hooks: {
            beforeSave: async login => {
                if(login.password) {
                    login.password_hash = await bcrypt.hash(login.password, 8);
                }
            }
        }
    }
    );

    Login.prototype.checkPassword = function(password) {
        return bcrypt.compare(password, this.password_hash);
    };

    return Login;
};