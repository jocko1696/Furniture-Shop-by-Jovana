const mongoose = require("mongoose");
const bcrypt = require ("bcryptjs");

const UserSchema = new mongoose.Schema(
    {

        email: {
            type: String,
            required: [true, "Please provide an Email!"],
            unique: [true, "Email Exist"],
            trim: true,
            // match: [/^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,}$/],

        },

        password: {
            type: String,
            required: [true, "Please provide a password!"],
            minLength: [6, "Password must be up to 6 characters"],
            //maxLength:[23,"Password must not be more than 23 characters"],
            unique: false,
        },

        role: {
            type: String,
            required: [true],
            default: "customer",
            enum: ["customer", "admin",],
        },

        photo: {
            type: String,
            required: [true, "Please add photo."],
            default: "https://ibb.co/album/mSMr3h",
        },

        firstName: {
            type: String,
            required: [true, "Please provide a first name!"],
            unique: false
        },
        lastName: {
            type: String,
            required: [true, "Please provide a last name!"],
            unique: false
        },
        street: {
            type: String,
            required: [true, "Please provide a street name!"],
            unique: false
        },
        // address: {
        //     type: String,
        //     required: [true, "Please provide address!"],
        //     unique: false
        // },

        streetNumber: {
            type: String,
            required: [true, "Please provide a street number!"],
            unique: false
        },

        postalCode: {
            type: String,
            required: [true, "Please provide a postal code!"],
            unique: false
        },
        city: {
            type: String,
            required: [true, "Please provide city!"],
            unique: false
        },
        phone: {
            type: String,
        },
    },

    {
        collection: "users",
    },
    {
        timestamps:true,
    }

    );

//Encrypt password before saving to DB
//Before saving schema to database fire async function given in the second parameter
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password = hashedPassword;
    next();

})

module.exports = mongoose.model("users", UserSchema);

