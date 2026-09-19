import Manager from "../models/managerModel.js";

export const addManager = async (req, res) => {
    try {
         const {name,email,phone,  salary,designation,status} = req.body;

        if (!name ||!email ||!phone ||!salary ||!designation) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        const existingManager = await Manager.findOne({
            email: email.toLowerCase()
        });

        if (existingManager) {
            return res.status(409).json({
                status: false,
                message: "Manager email already exists"
            });
        }

        const currentDate = new Date().toISOString();

        const manager = await Manager.create({ name,email: email.toLowerCase(), phone, salary, designation,
            status: status ?? true,
            created_date: currentDate,
            updated_date: currentDate
        });

        return res.status(201).json({
            status: true,
            message: "Manager added successfully",
            data: manager
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: "Manager insert failed",
            error: err.message
        });
    }
};

export const getAllManagers = async (req, res) => {
    try {

        const managers = await Manager.find();

        return res.status(200).json({
            status: true,
            message: "All manager data",
            total: managers.length,
            data: managers
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: "Failed to get manager data",
            error: err.message
        });
    }
};
export const deleteManager = async (req, res) => {
      try {    
        const { id } = req.params;
        const manager = await Manager.findByIdAndDelete(id);
        if (!manager) {
            return res.status(404).json({
                status: false,
                message: "Manager not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Manager deleted successfully",
            data: manager
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: "Manager delete failed",
            error: err.message
        });
    }
};

export const updateManager = async (req, res) => {
    try {
      const { id } = req.params;
        const {name,email,phone, salary,designation,status} = req.body;
        const manager = await Manager.findById(id);
        if (!manager) {
            return res.status(404).json({
                status: false,
                message: "Manager not found"
            });
        }

        manager.name = name ?? manager.name;
        manager.email = email
            ? email.toLowerCase()
            : manager.email;
        manager.phone = phone ?? manager.phone;
        manager.salary = salary ?? manager.salary;
        manager.designation = designation ?? manager.designation;
        manager.status = status ?? manager.status;
        manager.updated_date = new Date().toISOString();

        const updatedManager = await manager.save();

        return res.status(200).json({
            status: true,
            message: "Manager updated successfully",
            data: updatedManager
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: "Manager update failed",
            error: err.message
        });
    }
};

export const searchManager = async (req, res) => {
    try {

        const { name,email,phone} = req.query;
        const searchValue =name || email || phone;

        if (!searchValue) {
            return res.status(400).json({
                status: false,
                message: "Please provide name, email or phone"
            });
        }

        const searchRegex = new RegExp(
            searchValue,
            "i"
        );

        const managers = await Manager.find({
            $or: [
                { name: searchRegex },
                { email: searchRegex },
                { phone: searchRegex }
            ]
        });

        return res.status(200).json({
            status: true,
            message: "Search result",
            total: managers.length,
            data: managers
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: "Search failed",
            error: err.message
        });
    }
};

 