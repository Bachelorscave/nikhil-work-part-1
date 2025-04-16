const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const Owner = sequelize.define('Owner', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verificationTokenExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active'
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessLicense: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    hooks: {
      beforeSave: async (owner) => {
        if (owner.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          owner.password = await bcrypt.hash(owner.password, salt);
        }
      }
    }
  });

  // Instance methods
  Owner.prototype.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  Owner.prototype.toJSON = function() {
    const values = { ...this.get() };
    delete values.password;
    delete values.verificationToken;
    delete values.verificationTokenExpires;
    delete values.passwordResetToken;
    delete values.passwordResetExpires;
    return values;
  };

  return Owner;
}; 