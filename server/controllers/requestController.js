import Request from "../models/Request.js";

export const getRequests = async (req, res) => {
    try {
        const requests = await Request.find().sort({ createdAt: -1 });
        res.status(200).json(requests);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRequest = async (req, res) => {
    try {
        const { clientName, title } = req.body;

        if (!clientName || !title) {
            return res.status(400).json({ message: "Client name and title are required" })
        }

        const request = await Request.create({
            clientName,
            title,
        });
        res.status(201).json(request);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" })
        }

        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        )

        if (!request) {
            return res.status(404).json({ message: "Request not found" })
        }

        res.status(200).json(request);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

