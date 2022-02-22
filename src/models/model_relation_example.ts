import { dbConfig } from "../helpers/dbconfig";
import { Sequelize, Model, DataTypes, UniqueConstraintError, where } from 'sequelize'
import { Op } from "sequelize";

const Profile = dbConfig.define('Profile', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
});

const Certificate = dbConfig.define('Certificate', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const User = dbConfig.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Division = dbConfig.define('Division', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const UserCert = dbConfig.define('UserCert', {
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // 'Movies' would also work
            key: 'id'
        }
    },
    CertificateId: {
        type: DataTypes.INTEGER,
        references: {
            model: Certificate, // 'Actors' would also work
            key: 'id'
        }
    }
});

//Relation database and query, operatator

//1-1 relation
// User.hasOne(Profile);
// Profile.belongsTo(User);
User.hasOne(Profile, {
    foreignKey: 'profile_id'
});
Profile.belongsTo(User);

//Query
const oneToOne = User.findAll({
    //Join table
    include: {
        model: Profile,
        // divisionId < 1000 OR rank IS NULL
        where: {
            divisionId: {
                [Op.or]: {
                    [Op.lt]: 10,
                    [Op.eq]: null
                }
            }
        }
    },
    //where condition
    where: {
        name: {
            [Op.like]: '%' + "SomeKeyWord" + '%'
        }
    },
    //Order by
    order: ['DESC']
})

//1 - n relation
Division.hasMany(User);
User.belongsTo(Division);

//Select
const users = User.findAll({
    //Join table
    include: [{
        model: Profile,
        // where: {
        //     //where condition
        // }
    }, {
        model: Certificate
    }],
    // where: {
    //     //where condition
    // }
    // order: ['DESC'] oder by or group buy here
})

//n-n relation select through mid table ( user_cert )
User.belongsToMany(Certificate, { through: UserCert });
Certificate.belongsToMany(Certificate, { through: UserCert });

User.hasMany(UserCert);
UserCert.belongsTo(User);
Certificate.hasMany(UserCert);
UserCert.belongsTo(Certificate);

//Query
User.findAll({
    include: [
        {
            model: UserCert,
            include: [User, Certificate]
        },
        {
            model: Certificate,
            include: {
                model: User,
                include: {
                    model: UserCert,
                    include: [User, Profile]
                }
            }
        }
    ]
});

//Demo create, update, delete
User.create({
    name: "Hi",
})

User.update({
    name: "Haha",
}, {
    where: {
        id: 1
    }
})

User.destroy({
    where: {
        id: 1
    }
});
