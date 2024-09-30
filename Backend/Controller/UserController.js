const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching users',
            error: err.message,
        });
    }
};
exports.createUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required fields',
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new user without hashing the password
        const newUser = new User({ email, password }); // Storing password as plain text (not recommended)
        const user = await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating user',
            error: err.message,
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required fields',
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Use matchPassword to compare the password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error logging in',
            error: err.message,
        });
    }
};


// // Get a single user by ID
// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({
//                 message: 'User not found',
//             });
//         }
//         res.status(200).json({
//             message: 'User fetched successfully',
//             data: user,
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: 'Error fetching user',
//             error: err.message,
//         });
//     }
// };

// // // Update a user
// // exports.updateUser = async (req, res) => {
// //     const { name, email, password } = req.body;

// //     // Validate if the body has at least one valid field to update
// //     if (!name && !email && !password) {
// //         return res.status(400).json({
// //             message: 'At least one field (name, email, or password) is required for updating',
// //         });
// //     }

// //     try {
// //         const updateData = { name, email };
        
// //         // Hash the password if it's provided
// //         if (password) {
// //             updateData.password = await bcrypt.hash(password, 10);
// //         }

// //         const user = await User.findByIdAndUpdate(
// //             req.params.id,
// //             updateData,
// //             { new: true, runValidators: true }
// //         );

// //         if (!user) {
// //             return res.status(404).json({
// //                 message: 'User not found',
// //             });
// //         }

// //         res.status(200).json({
// //             message: 'User updated successfully',
// //             data: user,
// //         });
// //     } catch (err) {
// //         res.status(500).json({
// //             message: 'Error updating user',
// //             error: err.message,
// //         });
// //     }
// // };

// // // Delete a user
// // exports.deleteUser = async (req, res) => {
// //     try {
// //         const user = await User.findByIdAndDelete(req.params.id);

// //         if (!user) {
// //             return res.status(404).json({
// //                 message: 'User not found',
// //             });
// //         }

// //         res.status(200).json({
// //             message: 'User deleted successfully',
// //         });
// //     } catch (err) {
// //         res.status(500).json({
// //             message: 'Error deleting user',
// //             error: err.message,
// //         });
// //     }
// // };
